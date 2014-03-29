package com.threeC.beans;

public class UnitFactory {
	
	public static Unit cavalry(long uuid, long owner) {
		return new Unit(4, 3, 15, "cavalry", uuid, owner);
	}
	
	public static Unit infantry(long uuid, long owner) {
		return new Unit(5, 5, 10, "infantry", uuid, owner);		
	}
	
	public static Unit cannon(long uuid, long owner) {
		return new Unit(10, 2, 7, "cannon", uuid, owner);
	}

	public static Unit fromString(String type, long uuid, long owner) {
		if( type.equals("cannon") ) {
			return cannon(uuid, owner);
		} else if ( type.equals("infantry") ) {
			return infantry(uuid, owner);
		} else if ( type.equals("cavalry") ) {
			return cavalry(uuid, owner);
		} else {
			return null;
		}
	}
}
