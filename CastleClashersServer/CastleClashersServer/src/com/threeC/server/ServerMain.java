package com.threeC.server;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
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

import com.threeC.beans.Player;
import com.threeC.beans.Castle;
import com.threeC.beans.UUIDDistributor;
import com.threeC.beans.Unit;
import com.threeC.beans.UnitFactory;

class JWebSocketListener implements WebSocketServerTokenListener {	
	public int status = 0; //0 = WAITING, 1 = STARTED, 2 = GAME ENDED
	public int numPlayers = 0;
	public int joinedPlayers = 0;
	public boolean init = false;
	
	public boolean incomeRecalcReq = true;
	
	public LinkedList<Player> players = new LinkedList<Player>();
	LinkedList<Castle> castles = new LinkedList<Castle>();
	LinkedList<Unit> units = new LinkedList<Unit>();
	
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
			sendToAll("{\"type\":\"win\",\"player1\":" + player1.uuid + ",\"player2\":" + p2 + "}");
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
	
	public void distributeCastles(int gameboardSizeX, int gameboardSizeY) {
		int i = 0;
		int r = Math.min(gameboardSizeX, gameboardSizeY-50)/2;
		int x = gameboardSizeX/2;
		int y = (gameboardSizeY-50)/2;
		int n = numPlayers;
		double a = Math.PI / (2*n);
		
		for(Player player : players) {
			if(player.active) {
				if(i < n) {
					castles.add(new Castle((int)(x - 86/2 + r * Math.cos(2 * Math.PI * i / n + a)), (int)(50 + y - 41/2 + r * Math.sin(2 * Math.PI * i / n + a)), uuidDistributor.next(), player.uuid));
					i++;
				}
				else {
					player.active = false;
				}
			}
		}
		
		i = 0;
		r /= 2;
		a += Math.PI;
		for(;i<n;i++) {
			castles.add(new Castle((int)(x - 86/2 - r * Math.cos(2 * Math.PI * i / n + a)), (int)(50 + y - 41/2 + r * Math.sin(2 * Math.PI * i / n + a)), uuidDistributor.next(), -1));
		}
		
		castles.add(new Castle(-86/2 + (int)x,50 - 41 + (int)y,uuidDistributor.next(),-1));
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
	
	public void sendToUUID(long uuid, String s) {
		Player player = (Player)getByUUID(uuid);
		if(player == null) { return; }
		for(WebSocketEngine wse : server.getEngines().values()) {
			for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
				if(wsc.getSession().getSessionId().equals(player.sessionId)) {
					server.sendToken(wsc, JSONProcessor.JSONStringToToken(s));
				}				
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
					if(Math.abs(dx) == unit.speed && Math.abs(dy) == unit.speed) {
						dx = (dx < 0 ? -1 : 1) * (unit.speed / 2);
						dy = (dy < 0 ? -1 : 1) * (unit.speed / 2);						
					}
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
					if(Math.abs(dx) == unit.speed && Math.abs(dy) == unit.speed) {
						dx = (dx < 0 ? -1 : 1) * (unit.speed / 2);
						dy = (dy < 0 ? -1 : 1) * (unit.speed / 2);						
					}
						
					unit.x += dx;
					unit.y += dy;
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
			Player owner1 = (Player)getByUUID(unit1.owner);
			if(unit1.battle < 0) {
				for(int j=0;j<units.size();j++) {
					Unit unit2 = units.get(j);
					Player owner2 = (Player)getByUUID(unit2.owner);
					if(	unit1 != unit2 && unit1.owner != unit2.owner
						&& owner1.alliance != owner2.uuid
						&& Math.abs(unit1.x-unit2.x) < 50 
						&& Math.abs(unit1.y-unit2.y) < 50
						&& unit1.battle < 0 
						&& unit2.battle < 0 )
					{
						unit1.battle = unit2.uuid;
						unit2.battle = unit1.uuid;
						
						unit1.takeDamage(Math.max(unit2.attack - unit1.defense, 1));
						unit1.addXp(10);
						
						unit2.takeDamage(Math.max(unit1.attack - unit2.defense, 1));
						unit2.addXp(10);
						
						sendToAll(unit1.toJSON());
						sendToAll(unit2.toJSON());
						
						sendToAll("{\"type\":\"battle\",\"x\":" 
								+ ((unit1.x+unit2.x)/2) + ",\"y\":" 
								+ ((unit1.y+unit2.y)/2)								
								+ "}");
						
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
	
	public void siegeCastles() {
		for(int i=0;i<castles.size();i++) {
			Castle castle = castles.get(i);
			Player owner = (Player)getByUUID(castle.owner);
			for(int j=0;j<units.size();j++) {
				Unit unit = units.get(j);
				if(unit.owner != castle.owner					
					&& unit.battle < 0
					&& Math.abs(unit.x-castle.x) <= 50
					&& Math.abs(unit.y-castle.y) <= 50) {
					if((owner != null && unit.owner != owner.alliance) || castle.owner < 0) {
						unit.battle = castle.uuid;
						castle.health -= unit.siege;
						if(castle.health <= 0) {
							castle.owner = unit.owner;
							castle.health = castle.maxHealth / 2;
							incomeRecalcReq = true;
						}
						sendToAll(castle.toJSON());
						
						sendToAll("{\"type\":\"siege\",\"x\":" 
							+ ((unit.x+castle.x)/2) + ",\"y\":" 
							+ ((unit.y+castle.y)/2)	+ "}");
					}						
				}
			}
			
		}	
	}	
	
	@Override
	public void processOpened(WebSocketServerEvent event) {
		if(status == 0) {
			System.out.println("Connection Opened (active) " + event.getSessionId());
			Player newPlayer = getPlayerBySessionId(event.getSessionId());
			if(newPlayer == null) {
				newPlayer = new Player("", event.getSessionId(), uuidDistributor.next());				
			} else {
				newPlayer.active = true;
			}
			players.add(newPlayer);
			System.out.println(newPlayer.toJSON());
			event.sendPacket(JSONProcessor.tokenToPacket(JSONProcessor.JSONStringToToken(newPlayer.toJSON())));
		} else {
			System.out.println("Connection Opened (inactive) " + event.getSessionId());
			Player player = getPlayerBySessionId(event.getSessionId());
			if(player == null) {
				player = new Player("", event.getSessionId(), uuidDistributor.next());
				player.active = false;
				player.gold = 0;
				players.add(player);
			} else {
				player.active = true;
			}
			event.sendPacket(JSONProcessor.tokenToPacket(JSONProcessor.JSONStringToToken("{\"type\":\"start\"}")));
			for(Castle castle : castles) {
				event.sendPacket(JSONProcessor.tokenToPacket(JSONProcessor.JSONStringToToken(castle.toJSON())));
			}
			for(Unit unit : units) {
				event.sendPacket(JSONProcessor.tokenToPacket(JSONProcessor.JSONStringToToken(unit.toJSON())));
			}
		}
	}
	
	@Override
	public void processPacket(WebSocketServerEvent event, WebSocketPacket packet) {
	
	}
	
	@Override
	public void processClosed(WebSocketServerEvent event) {
		System.out.println("Connection Closed");
		Player player = getPlayerBySessionId(event.getSessionId());
		player.active = false;
		if(player.joined) { 
			synchronized(this) { 
				joinedPlayers--; 
			}
		}
		/*for(int i=0;i<players.size();i++) {
			if(players.get(i).sessionId().equals(event.getSessionId())) {
				players.remove(i);
				break;
			}
		}*/
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
								if(castle != null && castle.owner == player.uuid && castle.upgrade(player)) {
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
									sendToAll(castle.toJSON());
									incomeRecalcReq = true;
								} else {
									event.sendToken(JSONProcessor.JSONStringToToken("{\"type\":\"message\",\"message\":\"Failed to purchase upgrade\"}"));
								}
							} else if(json.getString("purchase").equals("reinforce")) {
								Castle castle = (Castle)getByUUID(json.getLong("uuid"));
								if(castle != null && castle.owner == player.uuid && castle.reinforce(player, server)) {
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
								} else {
									event.sendToken(JSONProcessor.JSONStringToToken("{\"type\":\"message\",\"message\":\"Failed to purchase heal\"}"));
								}
							}
						} else {
							if(json.getString("purchase").equals("new")) {								
								if(isValidPurchase(json.getInt("x"), json.getInt("y"), player.uuid) && player.charge(25)) {
									UnitFactory.fromString(json.getString("type"), uuidDistributor.next(), player.uuid, json.getInt("x"), json.getInt("y"), server, units);
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));									
								} else {
									event.sendToken(JSONProcessor.JSONStringToToken("{\"type\":\"message\",\"message\":\"Failed to purchase unit\"}"));
								}
							} else if(json.getString("purchase").equals("upgrade")) {
								Unit unit = (Unit)getByUUID(json.getLong("uuid"));
								if(unit != null && unit.owner == player.uuid && unit.upgrade(player)) {
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
									sendToAll(unit.toJSON());
								} else {
									event.sendToken(JSONProcessor.JSONStringToToken("{\"type\":\"message\",\"message\":\"Failed to purchase upgrade\"}"));
								}
							} else if(json.getString("purchase").equals("reinforce")) {
								Unit unit = (Unit)getByUUID(json.getLong("uuid"));
								if(unit != null && unit.owner == player.uuid && unit.reinforce(player, server)) {
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
									sendToAll(unit.toJSON());
								} else {
									event.sendToken(JSONProcessor.JSONStringToToken("{\"type\":\"message\",\"message\":\"Failed to purchase heal\"}"));
								}
							}
						}						
					} else if( json.getString("action").equals("moveto") 
							&& json.has("selected") 
							&& json.has("target") ) {
						Object selected = getByUUID(json.getLong("selected"));
						Object target = getByUUID(json.getLong("target"));
						if(selected != null && selected instanceof Unit) {
							Unit unit = (Unit)selected;
							if(unit.owner == player.uuid){ 
								if(target != null && target instanceof Unit) {
									Unit utarget = (Unit)target;
									if(unit.owner != utarget.owner) {
										unit.dest = json.getLong("target");
									}
								} else {
									unit.dest = json.getLong("target");
								}
							}
						}						
						
					} else if( json.getString("action").equals("surrender") ) {
						player.active = false;
						player.gold = 0;
						event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
					} else if( json.getString("action").equals("offer")							 
							&& json.has("target") ) {
						Player target = (Player)getByUUID(json.getLong("target"));						
						if(target != null) {
							if(target.offer != null && target.offer == player) {
								player.alliance = target.uuid;
								target.alliance = player.uuid;
								sendToUUID(json.getLong("target"), "{\"type\":\"message\"," +
										"\"message\":\"" + player.name 
										+ " has accepted your alliance request\"}");
							} else if(target.alliance != player.uuid) {
								player.offer = target;
								sendToUUID(json.getLong("target"), "{\"type\":\"message\"," +
									"\"message\":\"" + player.name 
									+ " has requested an alliance, to accept, request an alliance with him/her\"}");
							}
							sendToUUID(player.uuid, player.toJSON());
							sendToUUID(json.getLong("target"), target.toJSON());
							//System.out.printf("src alliance: %d, trg alliance: %d%n",player.alliance,target.alliance);
						}
					} else if(json.getString("action").equals("break")
							&& json.has("target") ) {
						Player target = (Player)getByUUID(json.getLong("target"));
						if(target != null) {
							player.offer = null;
							target.offer = null;
							player.alliance = -1l;
							target.alliance = -1l;
							sendToUUID(player.uuid, player.toJSON());
							sendToUUID(json.getLong("target"), target.toJSON());
							sendToUUID(json.getLong("target"), "{\"type\":\"message\"," +
									"\"message\":\"" + player.name 
									+ " has broken the alliance\"}");						
						}
					} else if(json.getString("action").equals("chat") 
							&& json.has("chat")
							&& json.has("to") ) {
						if(json.getString("to").equals("all")) {
							sendToAll(json.toString());
						} else {
							sendToUUID(json.getLong("to"), json.toString());
						}
					} else if(json.getString("action").equals("join") &&
							json.has("name") ) {
						player.name = json.getString("name");
						if(joinedPlayers < numPlayers) {
							player.active = true;
							player.joined = true;
							joinedPlayers++;
							status = joinedPlayers < numPlayers ? 0 : 1;
							System.out.println("status: " + status);
							if(status == 1) {
								sendToAll("{\"type\":\"start\"}");
							}
						}
					}
					
				}
			} catch (JSONException e) {
				e.printStackTrace();
			}
		} else {
			try {
				System.out.println("inactive player sent message" + JSONProcessor.tokenToJSON(token).toString());
			} catch (JSONException e) {	e.printStackTrace(); }
		}
		
	}
}

public class ServerMain {
	public static void main(String[] args){
		int i = -1;
		while(i < 0) {
			BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
			System.out.print("Number of players: ");
	        try{
	        	i = Integer.parseInt(br.readLine());
	        } catch(NumberFormatException e){
	        	e.printStackTrace();
	        } catch (IOException e) {
	        	e.printStackTrace();
	        }
		}
		
		JWebSocketFactory.printCopyrightToConsole();
		JWebSocketConfig.initForConsoleApp(args);
		JWebSocketFactory.start();
		TokenServer server = (TokenServer)JWebSocketFactory.getServer("ts0");
		
		assert server != null;

		JWebSocketListener jwsl = new JWebSocketListener();
		server.addListener(jwsl);
		jwsl.server = server;
		jwsl.numPlayers = i;		
		
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
				Thread.sleep(1000-(end-start) > 0 ? 1000-(end-start) : 0);
			} catch (InterruptedException e) { e.printStackTrace(); }
		}
		System.out.println("Server shutting down...");
	}	
	
	public static void firstFire(JWebSocketListener jwsl, TokenServer server) {
		jwsl.distributeCastles(1280, 1280);		
		gameFire(jwsl, server);
	}
	
	public static void gameFire(JWebSocketListener jwsl, TokenServer server) {		
		jwsl.moveUnits();
		jwsl.battleUnits();
		jwsl.siegeCastles();
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
