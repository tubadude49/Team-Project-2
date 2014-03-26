package com.threeC.beans;

import org.json.JSONException;
import org.json.JSONObject;

public class Unit implements JSONStringifiable {
	public long uuid;
	public long owner;
	
	public int xp;
	public int veterancy;
	
	public int health;
	public int upgrade;
	
	public int attack;
	public int defense;
	public int speed;
	
	public int x;
	public int y;
	
	public long dest = -1l;
	public String type;
	
	protected Unit(int attack, int defense, int speed, String type, long uuid, long owner) {
		this.attack = attack;
		this.defense = defense;
		this.speed = speed;
		this.type = type;
		this.uuid = uuid;
		this.owner = owner;
	}
	
	@Override
	public String toString() {
		return toJSON();
	}

	@Override
	public String toJSON() {
		JSONObject json = new JSONObject(this, new String[] { "uuid", "x", "y", "health", "upgrade", "veterancy", "owner", "attack", "defense", "speed", "dest", "type" } );
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
			this.veterancy = jsonO.getInt("veterancy");
			this.attack = jsonO.getInt("attack");
			this.defense = jsonO.getInt("defense");
			this.speed = jsonO.getInt("speed");
			this.dest = jsonO.getLong("dest");
			this.type = jsonO.getString("type");
			this.owner.fromJSON(jsonO.getString("owner"));
		} catch (JSONException e) {	e.printStackTrace(); }
		
	}
	
	public void addXp(int xp) {
		this.xp += xp;
		// veterancy go here
	}
	
	public void takeDamage(int damage) {
		health -= damage;
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
