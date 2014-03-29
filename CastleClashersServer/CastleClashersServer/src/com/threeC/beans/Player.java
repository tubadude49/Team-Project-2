package com.threeC.beans;

import org.json.JSONException;
import org.json.JSONObject;

public class Player implements JSONStringifiable {
	public boolean active = true;
	
	public long uuid;
	
	public String name;
	public int gold = 25;
	public float income = 0;
	
	public long alliance = -1l;
	public long war = -1l;
	
	public String sessionId;
	
	public Player(String name, String sessionId, long uuid) {
		this.name = name;
		this.sessionId = sessionId;
		this.uuid = uuid;		
	}
	
	public String sessionId() {
		return sessionId;
	}
	
	@Override
	public String toString() {
		return toJSON();
	}
	
	@Override
	public String toJSON() {
		JSONObject json = new JSONObject(this, new String[] { "uuid", "name", "gold", "income" } );
		try {
			json.put("type", "instance");
			json.put("alliance", alliance);
			json.put("war", war);
		} catch (JSONException e) {
			e.printStackTrace();
		}
		return json.toString();
	}

	@Override
	public void fromJSON(String json) {
		try {
			JSONObject jsonO = new JSONObject(json);
			this.uuid = jsonO.getLong("uuid");
			this.name = jsonO.getString("name");
			this.gold = jsonO.getInt("gold");
			this.income = jsonO.getInt("income");
			
		} catch (JSONException e) {	e.printStackTrace(); }
		
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String name() {
		return name;
	}
	
	public void updateIncome() {
		//income = castles.size();
	}
	
	public synchronized void incrGold() {
		gold += income;
	}
	
	public int gold() {
		return gold;
	}
	
	/*public synchronized Unit purchaseUnit(String type, UUIDDistributor uuidDistributor) {
		/* purchase types:
		 * Unit = 25g
		 * Unit Upgrade = 15g
		 * Castle Upgrade = 100g
		 */
		
		/*if( (type.equals("cavalry") || type.equals("infantry") || type.equals("cannon")) && charge(25) ) {
			return UnitFactory.fromString(type, uuidDistributor.next(), uuid);
		}
		return null;
	}*/
	
	public synchronized boolean charge(int amount) {
		if(gold < amount) {
			return false;
		} else {
			gold -= amount;
			return true;
		}
	}
	
	public void moveUnit(String x, String y) {
		
	}
	
	public void upgrade(String target) {
		//check gold
	}
	
	public void ally(Player target) {
		
		//add all ally wars
	}
	
	public void backstab(Player target) {
		
		//remove all ally wars
	}
	
	public void war(Player target) {
		//war = target;
		//wars.add(war);
	}
	
	public void peace() {		
		
		//remove alliance member from wars from this war
		
		//war = null;
	}

}
