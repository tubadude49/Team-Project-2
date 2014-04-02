package com.threeC.beans;

import org.json.JSONException;
import org.json.JSONObject;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketEngine;
import org.jwebsocket.packetProcessors.JSONProcessor;
import org.jwebsocket.server.TokenServer;

public class Castle implements JSONStringifiable {
	public long uuid;
	public long owner;
	
	public int x;
	public int y;

	public int maxHealth = 1000;
	public int health = 1000;
	public int upgrade;
	public int income = 2;
	
	public final String type = "castle";
	
	public Castle(int x, int y, long uuid, long owner) {
		this.x = x;
		this.y = y;
		this.uuid = uuid;
		this.owner = owner;
	}
	
	@Override
	public String toString() {
		return toJSON();
	}
	
	@Override
	public String toJSON() {
		JSONObject json = new JSONObject(this, new String[] { "uuid", "x", "y", "health", "upgrade", "owner", "type" } );
		return json.toString();
	}

	@Override
	public void fromJSON(String json) {
		try {
			JSONObject jsonO = new JSONObject(json);
			this.uuid = jsonO.getLong("uuid");
			this.x = jsonO.getInt("x");
			this.y = jsonO.getInt("y");
			this.health = jsonO.getInt("health");
			this.upgrade = jsonO.getInt("upgrade");
			this.owner = jsonO.getLong("owner");
		} catch (JSONException e) {	e.printStackTrace(); }		
		
	}
	
	public synchronized boolean reinforce(Player owner, TokenServer server) {
		if(this.health < this.maxHealth && owner.charge(50)) {
			new HealthThread(this, server);
			//health = maxHealth;
			return true;
		}
		return false;
	}
	
	public synchronized boolean upgrade(Player owner) {
		if(upgrade < 3) {
			if(owner.charge(100)) {
				upgrade++;
				health += 500;
				maxHealth += 500;
				income += 1;
				return true;
			}
		}		
		return false;		
	}
	
	public long uuid() {
		return uuid;
	}
	
	public void takeDamage(int damage) {
		health -= damage;
	}
	
	public void upgrade() {
	
	}
	
}

class HealthThread extends Thread implements Runnable {
	TokenServer server;
	Castle castle;
	
	public HealthThread(Castle castle, TokenServer server) {
		this.castle = castle;
		this.server = server;
		this.start();
	}
	
	@Override
	public void run() {
		int heal = castle.maxHealth - castle.health;
		while(heal > 0) {
			try {
				synchronized(castle) {
					castle.health += (heal > 10) ? 10 : heal;
				}
				heal -= 10;
				for(WebSocketEngine wse : server.getEngines().values()) {
					for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
						server.sendToken(wsc, JSONProcessor.JSONStringToToken(castle.toJSON()));
					}
				}
				Thread.sleep(100);
			} catch (InterruptedException e) { e.printStackTrace(); }
		}
	}
}