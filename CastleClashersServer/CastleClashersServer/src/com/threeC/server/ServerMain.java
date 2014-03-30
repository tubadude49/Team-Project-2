package com.threeC.server;

import java.util.LinkedList;

import org.json.JSONException;
import org.json.JSONObject;
import org.jwebsocket.factory.JWebSocketFactory;
import org.jwebsocket.server.TokenServer;
import org.jwebsocket.token.Token;
import org.jwebsocket.kit.WebSocketServerEvent;
import org.jwebsocket.listener.WebSocketServerTokenEvent;
import org.jwebsocket.listener.WebSocketServerTokenListener;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketEngine;
import org.jwebsocket.api.WebSocketPacket;
import org.jwebsocket.config.JWebSocketConfig;
import org.jwebsocket.instance.JWebSocketInstance;
import org.jwebsocket.packetProcessors.JSONProcessor;

import com.threeC.beans.Battle;
import com.threeC.beans.Player;
import com.threeC.beans.Castle;
import com.threeC.beans.Siege;
import com.threeC.beans.UUIDDistributor;
import com.threeC.beans.Unit;
import com.threeC.beans.UnitFactory;

class JWebSocketListener implements WebSocketServerTokenListener {	
	public int status = 0; //0 = WAITING, 1 = STARTED, 2 = GAME ENDED
	public boolean init = false;
	
	public boolean incomeRecalcReq = true;
	
	public LinkedList<Player> players = new LinkedList<Player>();
	LinkedList<Castle> castles = new LinkedList<Castle>();
	LinkedList<Unit> units = new LinkedList<Unit>();
	LinkedList<Battle> battles = new LinkedList<Battle>();
	LinkedList<Siege> sieges = new LinkedList<Siege>();
	
	UUIDDistributor uuidDistributor = new UUIDDistributor();
	
	public TokenServer server = null;
	
	public void checkWin() {
		long p1 = -1l, p2 = -1l;
		for(Castle castle : castles) {			
			if(castle.owner >= 0) {
				if(p1 < 0 || p1 == castle.owner) {
					p1 = castle.owner;
				} else if(p2 < 0 || p2 == castle.owner) {
					p2 = castle.owner;
				} else {
					return;
				}
			}
		}
		if(p1 < 0 && p2 < 0) { return; }
		Player player1 = (Player)getByUUID(p1);	
		if(player1 != null && player1.alliance == p2) {
			//sendToAll("{'type':'win','player1':" + player1.uuid + ",'player2':" + p2 + "}");
			status = 2;
		} else {
			return;
		}
		
	}
	
	public void recalcIncome() {
		if(incomeRecalcReq) {
			for(Player player : players) {
				player.income = 0;
			}
			for(Castle castle : castles) {
				Player owner = (Player)getByUUID(castle.owner);
				if(owner != null) {
					owner.income += castle.income;
				}			
			}
			incomeRecalcReq = false;
		}
	}
	
	public void distributeCastles() {
		final int gameboardX = 1280-86;
		final int gameboardY = 720-41-50;
		int validPlayers = 0;
		
		for(Player player : players) {
			if(player.active) {
				validPlayers++; 
				if(validPlayers == 1) { 
					/*Player1*/
					castles.add(new Castle(0, 50, uuidDistributor.next(), player.uuid));
					/*castles.add(new Castle(0, gameboardY + 50, uuidDistributor.next(), player.uuid));
					castles.add(new Castle(gameboardX, 50, uuidDistributor.next(), player.uuid));
					castles.add(new Castle(gameboardX, gameboardY + 50, uuidDistributor.next(), player.uuid));*/
					 
				} else if(validPlayers == 2) {
					/*Player2*/
					castles.add(new Castle(0, gameboardY + 50, uuidDistributor.next(), player.uuid));
				} else if(validPlayers == 3) {
					/*Player3*/
					castles.add(new Castle(gameboardX, 50, uuidDistributor.next(), player.uuid));
				} else if(validPlayers == 4) {
					/*Player4*/
					castles.add(new Castle(gameboardX, gameboardY + 50, uuidDistributor.next(), player.uuid));
				} else {
					player.active = false;
				}
			}
		}
		castles.add(new Castle(gameboardX/2 - gameboardX/4, gameboardY/2 + 50, uuidDistributor.next(), -1));
		castles.add(new Castle(gameboardX/2 + gameboardX/4, gameboardY/2 + 50, uuidDistributor.next(), -1));
		castles.add(new Castle(gameboardX/2, gameboardY/2 - gameboardY/3 + 50, uuidDistributor.next(), -1));
		castles.add(new Castle(gameboardX/2, gameboardY/2 + gameboardY/3 + 50, uuidDistributor.next(), -1));
		for(Castle castle : castles) {
			sendToAll(castle.toJSON());
		}
	}
	
	public boolean isValidPurchase(int x, int y, long ownerUuid) {
		for(Castle castle : castles) {
			if(castle.x == x && castle.y == y && castle.owner == ownerUuid) {
				return true;
			}
		}
		return false;
	}
		
	public Player getPlayerBySessionId(String sessionId) {
		for(Player player : players) {
			if(player.sessionId().equals(sessionId)) {
				return player;
			}
		}
		return null;
	}
	
	public Object getByUUID(long uuid) {
		for(int i=0;i<units.size();i++) {
			if(units.get(i).uuid == uuid) {
				return units.get(i);
			}
		}
		for(int i=0;i<castles.size();i++) {
			if(castles.get(i).uuid == uuid) {
				return castles.get(i);
			}
		}
		for(int i=0;i<battles.size();i++) {
			if(battles.get(i).uuid == uuid) {
				return battles.get(i);
			}
		}
		for(int i=0;i<players.size();i++) {
			if(players.get(i).uuid == uuid) {
				return players.get(i);
			}
		}
		return null;
	}
	
	public void sendToAll(String s) {
		for(WebSocketEngine wse : server.getEngines().values()) {
			for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
				server.sendToken(wsc, JSONProcessor.JSONStringToToken(s));
			}
		}
	}
	
	public void moveUnits() {
		for(int i=0;i<units.size();i++) {
			Unit unit = units.get(i);
			if(unit.dest > 0 && unit.battle < 0) {
				Object dest = getByUUID(unit.dest);
				if(dest != null && dest instanceof Unit) {
					Unit unitDest = (Unit)dest;					
					int dx = unitDest.x - unit.x;
						if(dx < -unit.speed) { dx = -unit.speed; }
						else if(dx > unit.speed) { dx = unit.speed; }
					int dy = unitDest.y - unit.y;
						if(dy < -unit.speed) { dy = -unit.speed; }
						else if(dy > unit.speed) { dy = unit.speed; }
					unit.x += dx;
					unit.y += dy;
				} else if(dest != null && dest instanceof Castle) {
					Castle castle = (Castle)dest;
					int dx = castle.x - unit.x; 
						if(dx < -unit.speed) { dx = -unit.speed; }
						else if(dx > unit.speed) { dx = unit.speed; }
					int dy = castle.y - unit.y;
						if(dy < -unit.speed) { dy = -unit.speed; }
						else if(dy > unit.speed) { dy = unit.speed; }
					unit.x += dx;
					unit.y += dy;
					if(dx == 0 && dy == 0 && castle.owner != unit.owner) {
						castle.health -= unit.attack * 10;
						if(castle.health <= 0) {
							castle.owner = unit.owner;
							castle.health = castle.maxHealth / 2;
							incomeRecalcReq = true;
							unit.dest = -1l;
						}
						sendToAll(castle.toJSON());
					}
				}
				sendToAll(unit.toJSON());				
				
			} else {
				unit.battle = -1l;
			}
		}		
	}
	
	public void battleUnits() {
		for(int i=0;i<units.size();i++) {
			Unit unit1 = units.get(i);
			if(unit1.battle < 0) {
				for(int j=0;j<units.size();j++) {
					Unit unit2 = units.get(j);
					if(	unit1 != unit2 && unit1.owner != unit2.owner
						&& Math.abs(unit1.x-unit2.x) < 50 
						&& Math.abs(unit1.y-unit2.y) < 50
						&& unit1.battle < 0 
						&& unit2.battle < 0 )
					{
						unit1.battle = unit2.uuid;
						unit2.battle = unit1.uuid;
						
						unit1.takeDamage(unit2.attack - unit1.defense);
						unit1.addXp(10);						
						
						unit2.takeDamage(unit1.attack - unit2.defense);
						unit2.addXp(10);
						
						sendToAll(unit1.toJSON());
						sendToAll(unit2.toJSON());
						
						break;
					}
				}
			}
		}
		
		for(int i=0;i<units.size();i++) {
			Unit unit = units.get(i);
			if(unit.health <= 0) {
				units.remove(i);
				i--;
			}
		}	
	}

	public void runBattles() {
		for(int i=0;i<battles.size();i++) {
			Battle battle = battles.get(i);
			battle.processBattleFrame();
			if(battle.blufor.size() <= 0 || battle.opfor.size() <= 0) {
				battles.remove(i);
			}
		}
	}
	
	@Override
	public void processOpened(WebSocketServerEvent event) {
		if(status == 0) {
			System.out.println("Connection Opened " + event.getSessionId());
			Player newPlayer = new Player("", event.getSessionId(), uuidDistributor.next());
			players.add(newPlayer);
			System.out.println(newPlayer.toJSON());
			event.sendPacket(JSONProcessor.tokenToPacket(JSONProcessor.JSONStringToToken(newPlayer.toJSON())));
			status = players.size() < 4 ? 0 : 1;
		} else {
			System.out.println("Connection rejected");
			Player player = new Player("", event.getSessionId(), uuidDistributor.next());
			player.active = false;
			player.gold = 0;
			players.add(player);			
		}
	}
	
	@Override
	public void processPacket(WebSocketServerEvent event, WebSocketPacket packet) {
	
	}
	
	@Override
	public void processClosed(WebSocketServerEvent event) {
		System.out.println("Connection Closed");
		for(int i=0;i<players.size();i++) {
			if(players.get(i).sessionId().equals(event.getSessionId())) {
				players.remove(i);
				break;
			}
		}
	}
	
	@Override
	public void processToken(WebSocketServerTokenEvent event, Token token){
		Player player = getPlayerBySessionId(event.getSessionId());
		if(player.active) {
			try {
				JSONObject json = JSONProcessor.tokenToJSON(token);
				System.out.println("JSON: " + json.toString());
				if( json.has("action") ) {
					if( json.getString("action").equals("purchase") 
						&& json.has("purchase") 
						&& json.has("type") 
						&& json.has("uuid") 
						&& json.has("x")
						&& json.has("y") ) {
						if(json.getString("type").equals("castle")) {
							if(json.getString("purchase").equals("upgrade")) {
								Castle castle = (Castle)getByUUID(json.getLong("uuid"));
								if(castle.owner == player.uuid && castle.upgrade(player)) {
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
									for(WebSocketEngine wse : server.getEngines().values()) {
										for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
											server.sendToken(wsc, JSONProcessor.JSONStringToToken(castle.toJSON()));
										}
									}
								}
							} else if(json.getString("purchase").equals("reinforce")) {
								Castle castle = (Castle)getByUUID(json.getLong("uuid"));
								if(castle.owner == player.uuid && castle.upgrade(player)) {
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
									for(WebSocketEngine wse : server.getEngines().values()) {
										for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
											server.sendToken(wsc, JSONProcessor.JSONStringToToken(castle.toJSON()));
										}
									}
								}
							}
						} else {
							if(json.getString("purchase").equals("new")) {								
								if(isValidPurchase(json.getInt("x"), json.getInt("y"), player.uuid) && player.charge(25)) {
									Unit newUnit = UnitFactory.fromString(json.getString("type"), uuidDistributor.next(), player.uuid);
									newUnit.x = json.getInt("x");
									newUnit.y = json.getInt("y");
									units.add(newUnit);
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
									for(WebSocketEngine wse : server.getEngines().values()) {
										for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
											server.sendToken(wsc, JSONProcessor.JSONStringToToken(newUnit.toJSON()));
										}
									}
								}						
							} else if(json.getString("purchase").equals("upgrade")) {
								Unit unit = (Unit)getByUUID(json.getLong("uuid"));
								if(unit.owner == player.uuid && unit.upgrade(player)) {
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
									for(WebSocketEngine wse : server.getEngines().values()) {
										for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
											server.sendToken(wsc, JSONProcessor.JSONStringToToken(unit.toJSON()));
										}
									}
								}
							} else if(json.getString("purchase").equals("reinforce")) {
								Unit unit = (Unit)getByUUID(json.getLong("uuid"));
								if(unit.owner == player.uuid && unit.reinforce(player)) {
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
									for(WebSocketEngine wse : server.getEngines().values()) {
										for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
											server.sendToken(wsc, JSONProcessor.JSONStringToToken(unit.toJSON()));
										}
									}
								}
							}
						}						
					} else if( json.has("action") && json.getString("action").equals("moveto") 
							&& json.has("selected") 
							&& json.has("target") ) {
						Unit unit = (Unit)getByUUID(json.getLong("selected"));
						unit.dest = json.getLong("target");
						
					} else if( json.getString("action").equals("surrender") ) {
						player.active = false;
						player.gold = 0;
						event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
					}
				}
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
		
	}
}

public class ServerMain {
	public static void main(String[] args){
		JWebSocketFactory.printCopyrightToConsole();
		JWebSocketConfig.initForConsoleApp(args);
		JWebSocketFactory.start();
		TokenServer server = (TokenServer)JWebSocketFactory.getServer("ts0");
		
		assert server != null;

		JWebSocketListener jwsl = new JWebSocketListener();
		server.addListener(jwsl);
		jwsl.server = server;
		while (JWebSocketInstance.getStatus() != JWebSocketInstance.SHUTTING_DOWN){
			try {
				long start = System.currentTimeMillis();
				if(jwsl.status == 1 && !jwsl.init) {
					firstFire(jwsl, server);
					jwsl.init = true;
				} else if (jwsl.status == 1 && jwsl.init){
					gameFire(jwsl, server);
				}
				long end = System.currentTimeMillis();
				Thread.sleep(1000-(end-start));
			} catch (InterruptedException e) { e.printStackTrace(); }
		}
		System.out.println("Server shutting down...");
	}	
	
	public static void firstFire(JWebSocketListener jwsl, TokenServer server) {
		jwsl.distributeCastles();		
		gameFire(jwsl, server);
	}
	
	public static void gameFire(JWebSocketListener jwsl, TokenServer server) {		
		jwsl.moveUnits();
		jwsl.battleUnits();
		jwsl.recalcIncome();
		for(WebSocketEngine wse : server.getEngines().values()) {
			for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
				Player player = jwsl.getPlayerBySessionId(wsc.getSession().getSessionId());
				if(player.active) {					
					player.incrGold();
				}
				server.sendToken(wsc, JSONProcessor.JSONStringToToken(player.toJSON()));
			}
		}
		jwsl.checkWin();
		//System.out.println(jwsl.status);
	}
}
