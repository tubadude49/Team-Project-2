package com.threeC.beans;

public interface JSONStringifiable {
	public String toJSON();
	public void fromJSON(String json);
}
