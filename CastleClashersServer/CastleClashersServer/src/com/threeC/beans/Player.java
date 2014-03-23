package com.threeC.beans;

import java.util.LinkedHashSet;
import java.util.LinkedList;

import org.json.JSONException;
import org.json.JSONObject;

public class Player implements JSONStringifiable {
	public long uuid;
	
	public String name;
	public int gold = 25;
	public int income;
	
	public long alliance = -1l;
	public long war = -1l;
	
	public LinkedList<Castle> castles = new LinkedList<Castle>();
	public LinkedList<Unit> units = new LinkedList<Unit>();
	
	public LinkedHashSet<Player> wars = new LinkedHashSet<Player>();
	
	public String sessionId;
	
	public Player(String name, String sessionId, long uuid) {
		this.name = name;
		this.sessionId = sessionId;
		this.uuid = uuid;
		
		castles.add(new Castle(-1,-1));
		castles.add(new Castle(-1,-1));
		castles.add(new Castle(-1,-1));
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
		JSONObject json = new JSONObject(this, new String[] { "uuid", "name", "gold", "income", "units", "wars" } );
		LinkedList<Long> castlesUUIDs = new LinkedList<Long>();
		LinkedList<Long> unitsUUIDs = new LinkedList<Long>();
		LinkedList<Long> warsUUIDs = new LinkedList<Long>();
		
		for(Castle castle : castles) {
			castlesUUIDs.add(castle.uuid());
		}
		
		for(Unit unit : units) {
			unitsUUIDs.add(unit.uuid());
		}
		
		for(Player war : wars) {
			warsUUIDs.add(war.uuid);
		}
		
		try {
			json.put("type", "instance");
			json.put("castles", castlesUUIDs);
			json.put("units", unitsUUIDs);
			json.put("wars", warsUUIDs);
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
			this.units.clear();
			for(int i=0;i<jsonO.getJSONArray("units").length();i++) {
				Unit u = new Unit(1,1,1,"",1);
				u.fromJSON(jsonO.getJSONArray("units").getString(i));
				this.units.add(u);
			}
			this.wars.clear();			
			for(int i=0;i<jsonO.getJSONArray("wars").length();i++) {
				Player p = new Player("","",1);
				p.fromJSON(jsonO.getJSONArray("wars").getString(i));
				this.wars.add(p);
			}
			
		} catch (JSONException e) {	e.printStackTrace(); }
		
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String name() {
		return name;
	}
	
	public void incrGold() {
		gold += income;
	}
	
	public int gold() {
		return gold;
	}
	
	public void purchase(String unitType) {
		//check gold
	}
	
	public void moveUnit(String x, String y) {
		
	}
	
	public void upgrade(String target) {
		//check gold
	}
	
	public LinkedList<Castle> castles() {
		return castles;
	}
	
	public LinkedList<Unit> units() {
		return units;
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
