package com.threeC.beans;

import org.json.JSONException;
import org.json.JSONObject;

public class Castle implements JSONStringifiable {
	public long uuid;
	
	public int x;
	public int y;
	
	public int health;
	public int upgrade;
	
	public Player owner = null;
	
	public Castle(int x, int y, long uuid) {
		this.x = x;
		this.y = y;
		this.uuid = uuid;
	}
	
	@Override
	public String toString() {
		return toJSON();
	}
	
	@Override
	public String toJSON() {
		JSONObject json = new JSONObject(this, new String[] { "uuid", "x", "y", "health", "upgrade", "owner" } );
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
			this.owner.fromJSON(jsonO.getString("owner"));
		} catch (JSONException e) {	e.printStackTrace(); }		
		
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
