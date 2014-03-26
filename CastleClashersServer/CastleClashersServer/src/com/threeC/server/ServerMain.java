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
	public int frame = 0;
	public final int startAt = 30;
	public LinkedList<Player> players = new LinkedList<Player>();
	LinkedList<Castle> castles = new LinkedList<Castle>();
	LinkedList<Unit> units = new LinkedList<Unit>();
	LinkedList<Battle> battles = new LinkedList<Battle>();
	LinkedList<Siege> sieges = new LinkedList<Siege>();
	
	UUIDDistributor uuidDistributor = new UUIDDistributor();
	
	public void distributeCastles() {
		final int gameboardX = 1280;
		final int gameboardY = 720;
		int validPlayers = 0;
		
		for(Player player : players) {
			if(player.active) {
				validPlayers++; 
				if(validPlayers == 1) { 
					/*Player1*/
					castles.add(new Castle(0, 0, uuidDistributor.next(), player.uuid));
				} else if(validPlayers == 2) {
					/*Player2*/
					castles.add(new Castle(0, gameboardX, uuidDistributor.next(), player.uuid));
				} else if(validPlayers == 3) {
					/*Player3*/
					castles.add(new Castle(gameboardY, 0, uuidDistributor.next(), player.uuid));
				} else if(validPlayers == 4) {
					/*Player4*/
					castles.add(new Castle(gameboardY, gameboardX, uuidDistributor.next(), player.uuid));
				} else {
					player.active = false;
				}
			}
		}
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
		for(Unit unit : units) {
			if(unit.uuid == uuid) {
				return unit;
			}
		}
		for(Castle castle : castles) {
			if(castle.uuid == uuid) {
				return castle;
			}
		}
		return null;
	}
	
	public void updateUnits() {
		for(Unit unit : units) {
			if(unit.dest > 0) {
				Object dest = getByUUID(unit.uuid);
				if(dest != null && dest instanceof Unit) {
					Unit unitDest = (Unit)dest;
					int dx = unitDest.x - unit.x;
						if(dx < 0) { dx = -1; }
						else if(dx > 0) { dx = 1; }
					int dy = unitDest.y - unit.y;
						if(dy < 0) { dy = -1; }
						else if(dy > 0) { dy = 1; }
					unit.x += dx;
					unit.y += dy;
					if(dx == 0 && dy == 0) { unit.dest = -1l; } 
				} else if(dest != null && dest instanceof Castle) {
					Castle castleDest = (Castle)dest;
					int dx = castleDest.x - unit.x; 
						if(dx < 0) { dx = -1; }
						else if(dx > 0) { dx = 1; }
					int dy = castleDest.y - unit.y;
						if(dy < 0) { dy = -1; }
						else if(dy > 0) { dy = 1; }
					unit.x += dx;
					unit.y += dy;
					if(dx == 0 && dy == 0) { unit.dest = -1l; } 
				}
				
			}		
		}
	}
	
	@Override
	public void processOpened(WebSocketServerEvent event) {
		if(frame < startAt) {
			System.out.println("Connection Opened " + event.getSessionId());
			players.add(new Player("", event.getSessionId(), uuidDistributor.next()));
			System.out.println(players.get(0).toJSON());
			event.sendPacket(JSONProcessor.tokenToPacket(JSONProcessor.JSONStringToToken(players.get(0).toJSON())));
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
						&& json.has("uuid") ) {
						if(json.getString("type").equals("castle")) {
							if(json.getString("purchase").equals("upgrade")) {
								Castle castle = (Castle)getByUUID(json.getLong("uuid"));
								if(castle.upgrade(player)) {
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
									event.sendToken(JSONProcessor.JSONStringToToken(castle.toJSON()));
								}
							} else if(json.getString("purchase").equals("reinforce")) {
								Castle castle = (Castle)getByUUID(json.getLong("uuid"));
								if(castle.reinforce(player)) {
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
									event.sendToken(JSONProcessor.JSONStringToToken(castle.toJSON()));	
								}
							}
						} else {
							if(json.getString("purchase").equals("new")) {								
								if(player.charge(25)) {
									Unit newUnit = UnitFactory.fromString(json.getString("type"), uuidDistributor.next(), player.uuid);
									units.add(newUnit);
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
									event.sendToken(JSONProcessor.JSONStringToToken(newUnit.toJSON()));	
									System.out.println("sent response" + newUnit.toJSON());
								}						
							} else if(json.getString("purchase").equals("upgrade")) {
								Unit unit = (Unit)getByUUID(json.getLong("uuid"));
								if(unit.upgrade(player)) {
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
									event.sendToken(JSONProcessor.JSONStringToToken(unit.toJSON()));
								}
							} else if(json.getString("purchase").equals("reinforce")) {
								Unit unit = (Unit)getByUUID(json.getLong("uuid"));
								if(unit.reinforce(player)) {
									event.sendToken(JSONProcessor.JSONStringToToken(player.toJSON()));
									event.sendToken(JSONProcessor.JSONStringToToken(unit.toJSON()));
								}
							}
						}						
					} /*else if( json.has("action") && json.getString("action").equals("moveto") 
							&& json.has("selected") 
							&& json.has("target") ) {
						long uuidSrc = json.getLong("selected");
						long uuidDest = json.getLong("target");
						Object src = getByUUID(uuidSrc);
						if(src instanceof Unit) {
							Unit unit = (Unit)src;
							unit.dest = uuidDest;
						}
					}	*/				
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
		while (JWebSocketInstance.getStatus() != JWebSocketInstance.SHUTTING_DOWN){
			try {
				if(jwsl.frame < jwsl.startAt) {
					pregameFire(jwsl, server);
				} else if(jwsl.frame == jwsl.startAt) {
					firstFire(jwsl, server);
				} else {
					gameFire(jwsl, server);
				}
				jwsl.frame++;
				Thread.sleep(1000);
			} catch (InterruptedException e) {}
		}
		System.out.println("Server shutting down...");
	}
	
	public static void pregameFire(JWebSocketListener jwsl, TokenServer server) {
		System.out.println(server.getEngines().size() + ":" + jwsl.frame);	
	}
	
	public static void firstFire(JWebSocketListener jwsl, TokenServer server) {
		jwsl.distributeCastles();
		gameFire(jwsl, server);
	}
	
	public static void gameFire(JWebSocketListener jwsl, TokenServer server) {
		System.out.println("frame:" + jwsl.frame);
		jwsl.updateUnits();
		for(WebSocketEngine wse : server.getEngines().values()) {
			for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
				Player player = jwsl.getPlayerBySessionId(wsc.getSession().getSessionId());
				if(player.active) {
					player.income = 5;
					player.incrGold();
				}
				server.sendToken(wsc, JSONProcessor.JSONStringToToken(player.toJSON()));
			}
		}
	}
}
