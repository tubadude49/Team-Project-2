package com.threeC.beans;

import org.json.JSONObject;
import org.jwebsocket.api.WebSocketConnector;
import org.jwebsocket.api.WebSocketEngine;
import org.jwebsocket.packetProcessors.JSONProcessor;
import org.jwebsocket.server.TokenServer;

public class Unit implements JSONStringifiable {
	public long uuid;
	public long owner;	
	public long battle = -1l;
	
	public int xp;
	public int veterancy;
	
	public int maxHealth;
	public int health;
	public int upgrade;
	
	public int siege;
	public int attack;
	public int defense;
	public int speed;
	public boolean healing = false;
	
	public int x;
	public int y;
	
	public long dest = -1l;
	public String type = "unit";
	public String subtype;
	
	public boolean built = false;
	
	protected Unit(int siege, int attack, int defense, int speed, int health, String subtype, long uuid, long owner) {
		this.siege = siege;
		this.attack = attack;
		this.defense = defense;
		this.speed = speed;
		this.health = this.maxHealth = health;
		this.subtype = subtype;
		this.uuid = uuid;
		this.owner = owner;
	}
	
	@Override
	public String toString() {
		return toJSON();
	}

	@Override
	public String toJSON() {
		JSONObject json = new JSONObject(this, new String[] { "uuid", "x", "y", "maxHealth", "health", "upgrade", "veterancy", "owner", "attack", "defense", "speed", "dest", "type", "subtype", "built" } );
		return json.toString();
	}

	@Override
	public void fromJSON(String json) {
		/*try {
			JSONObject jsonO = new JSONObject(json);
			JSONObject sprite = jsonO.getJSONObject("sprite");
			this.uuid = sprite.getLong("uuid");
			this.x = sprite.getInt("x");
			this.y = sprite.getInt("y");
			this.health = sprite.getInt("health");
			this.veterancy = sprite.getInt("veterancy");
			this.attack = sprite.getInt("attack");
			this.defense = sprite.getInt("defense");
			this.speed = sprite.getInt("speed");
			this.dest = sprite.getLong("dest");
			this.type = sprite.getString("type");
			this.owner = sprite.getLong("owner");
		} catch (JSONException e) {	e.printStackTrace(); }*/
		
	}
	
	public synchronized void addXp(int xp) {
		if(veterancy < 3) {
			this.xp += xp;
			if(this.xp / 100 > 0) {
				this.veterancy += this.xp / 100;
				this.xp %= 100;
				this.health += 15;
				this.maxHealth += 15;
				this.attack += 1;
				this.defense += 1;
			}			
		} else {
			this.xp = 100;
		}
	}
	
	public void takeDamage(int damage) {
		health -= damage;
	}
	
	public synchronized boolean reinforce(Player owner, TokenServer server) {
		if(this.health < this.maxHealth && !this.healing && owner.charge(10)) {
			new UnitHealThread(this, server);
			return true;
		}
		return false;
	}
	
	public synchronized boolean upgrade(Player owner) {
		if(upgrade < 3) {
			if(owner.charge(15)) {
				upgrade ++;
				health += 15;
				maxHealth += 15;
				attack += 1;
				defense += 1;
				return true;
			}
		}		
		return false;
	}
	
	public int attack() {
		return attack;
	}
	
	public int defense() {
		return defense;
	}
	
	public int speed() {
		return speed;
	}
	
	public long uuid() {
		return uuid;
	}
	
	public void setDest(Object target) {
	
	}
		
}

class UnitHealThread extends Thread implements Runnable {
	TokenServer server;
	Unit unit;
	
	public UnitHealThread(Unit unit, TokenServer server) {
		unit.healing = true;
		this.unit = unit;
		this.server = server;
		this.start();
	}
	
	@Override
	public void run() {
		int heal = unit.maxHealth - unit.health;
		while(heal > 0) {
			try {
				if(unit.health >= unit.maxHealth || unit.health <= 0) { break; }
				synchronized(unit) {
					unit.health += (heal > 1) ? 1 : heal;
				}
				heal -= 1;
				for(WebSocketEngine wse : server.getEngines().values()) {
					for(WebSocketConnector wsc : server.getConnectors(wse).values()) {
						server.sendToken(wsc, JSONProcessor.JSONStringToToken(unit.toJSON()));
					}
				}
				Thread.sleep(1000);
			} catch (InterruptedException e) { e.printStackTrace(); }
		}
		unit.healing = false;
	}
}
