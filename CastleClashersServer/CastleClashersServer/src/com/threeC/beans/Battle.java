package com.threeC.beans;

import java.util.LinkedList;
import java.util.TreeMap;

import org.json.JSONObject;

public class Battle implements JSONStringifiable {
	public long uuid;
	public int x;
	public int y;

	//LinkedList<Unit> units = new LinkedList<Unit>();
	
	public TreeMap<Long, LinkedList<Unit>> units = new TreeMap<Long, LinkedList<Unit>>();
	public TreeMap<Long, Integer> unitsAtk = new TreeMap<Long, Integer>();
	
	/*TreeMap<Long, Integer> owners = new TreeMap<Long, Integer>();*/
		
	public Battle(int x, int y, long uuid){
		this.x = x;
		this.y = y;
		this.uuid = uuid;
	}
	
	public void add(Unit unit) {
		if(unit.battle < 0) {
			unit.battle = this.uuid;
			LinkedList<Unit> tmp = (units.containsKey(unit.owner)) ? units.get(unit.owner) : new LinkedList<Unit>();
			tmp.add(unit);
			units.put(unit.owner, tmp);			
			unitsAtk.put(unit.owner, unitsAtk.get(unit.owner) + unit.attack);
		}		
	}
	
	public void processBattleFrame() {		
		for(LinkedList<Unit> unitList : units.values()) {
			int opposing = 0;
			int attack = 0;
			for(LinkedList<Unit> unitList2 : units.values()) {
				if(unitList != unitList2) { opposing += unitList2.size(); }
			}
			for(Integer i : unitsAtk.values()) {
				attack += i;
			}
			for(Unit unit : unitList) {
				unit.takeDamage(attack / (opposing * (units.size() - 1)));
			}
		}
		
		for(LinkedList<Unit> unitList : units.values()) {
			for(int i=0;i<unitList.size();i++) {
				Unit unit = unitList.get(i);
				Long key = unit.owner;
				if(unit.health <= 0) {
					unitList.remove(i);
					unitsAtk.put(unit.owner, unitsAtk.get(unit.owner) - unit.attack);
				}
				/*if(unitList.size() <= 0) {
					units.remove(key); uncomment this and feel the wrath of zeus
				}*/
			}
		}
	}
	
	public void attack(Unit attacker, Unit target) {
		
	}
	
	public void defend(Unit defender) {
		
	}
	
	public void flee(Player fleer) {
		
	}

	@Override
	public String toJSON() {
		JSONObject json = new JSONObject(this, new String[] { "uuid", "x", "y" } );
		return json.toString();
	}

	@Override
	public void fromJSON(String json) {
		// TODO Auto-generated method stub
		
	}
}
