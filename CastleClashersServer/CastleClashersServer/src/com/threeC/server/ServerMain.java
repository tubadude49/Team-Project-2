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

import com.threeC.beans.Player;
import com.threeC.beans.Castle;
import com.threeC.beans.UUIDDistributor;

class JWebSocketListener implements WebSocketServerTokenListener {
	public LinkedList<Player> players = new LinkedList<Player>();
	LinkedList<Castle> castles = new LinkedList<Castle>();
	UUIDDistributor uuidDistributor = new UUIDDistributor();
	
	public Player getPlayerBySessionId(String sessionId) {
		for(Player player : players) {
			if(player.sessionId().equals(sessionId)) {
				return player;
			}
		}
		return null;
	}
	
	@Override
	public void processOpened(WebSocketServerEvent event) {		
		System.out.println("Connection Opened " + event.getSessionId());
		players.add(new Player("", event.getSessionId(), uuidDistributor.next()));
		System.out.println(players.get(0).toJSON());
		event.sendPacket(JSONProcessor.tokenToPacket(JSONProcessor.JSONStringToToken(players.get(0).toJSON())));
	}
	
	@Override
	public void processPacket(WebSocketServerEvent event, WebSocketPacket packet) {
		/*if(mostrecent.equals(event.getSessionId())) {
			System.out.println(mostrecent);
		}
		try {
			JSONObject o = JSONProcessor.tokenToJSON(JSONProcessor.packetToToken(packet));
			System.out.println("Packet: " + o.toString());			
		} catch (JSONException e) {
			e.printStackTrace();
		}*/
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
		//System.out.println("Token: " + token.toString());
		try {
			JSONObject json = JSONProcessor.tokenToJSON(token);
			System.out.println("JSON: " + json.toString());
		} catch (JSONException e) {
			e.printStackTrace();
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
				//System.out.println(server.getEngines().size());
				for(WebSocketEngine wse : server.getEngines().values()) {
					for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
						Player player = jwsl.getPlayerBySessionId(wsc.getSession().getSessionId());
						player.updateIncome();
						player.incrGold();
						server.sendToken(wsc, JSONProcessor.JSONStringToToken(player.toJSON()));
						/*JSONObject o = new JSONObject();
						try {
							o.put("the", 1000);
						} catch (JSONException e) {
							e.printStackTrace();
						}						
						server.sendToken(wsc, JSONProcessor.JSONStringToToken(o.toString()));*/
					}
				}
				Thread.sleep(1000);
			} catch (InterruptedException e) {}
		}
		System.out.println("Server shutting down...");
	}
}
