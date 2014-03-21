class Castle {
	long uuid;
	final XY pos;
	public Castle(int x, int y) {
		pos = new XY(x,y);
	}
	public string toJSON();
	public long uuid() {
		return uuid;
	}
	public void takeDamage(int damage) {
		health -= damage;
	}
	public void upgrade() {
	
	}
	int health;
	int upgrade;
}

class Battle {
	public Battle(XY pos);
	long uuid;
	XY pos;
	List<Unit> units;
	public void attack(Unit attacker, Unit target);
	public void defend(Unit defender);
	public void flee(Player fleer);
}

class Siege {
	public Siege(XY pos);
	long uuid;
	XY pos;
	List<Unit> units;
	Castle castle;
	Player defender;
	public void breakSiege();
	public void flee(Player fleer);
}

class UnitFactory {
	public Unit cavalry() {
		return new Unit();
	}
	public Unit infantry() {
		return new Unit();		
	}
	public Unit cannon() {
		return new Unit();	
	}	
}

class XY {
	public XY(int x, int y) {
		this.x = x;
		this.y = y;
	}
	public XY() {
		x = 0;
		y = 0;
	}
	public x;
	public y;
}

protected class Unit {
	public Unit(int attack, int defense, int speed, string type);
	
	int xp;
	int veterancy;
	
	int health;
	int upgrade;
	
	int attack;
	int defense;
	int speed;
	
	XY pos;
	
	Object dest;
	Player owner;
	string type;
	
	public addXp(int xp) {
		this.xp += xp;
		// veterancy go here
	}
	public takeDamage(int damage) {
		health -= damage;
	}
	public int attack() {
	
	}
	public int defense() {
	
	}
	public int speed() {
	
	}
	public setDest(Object target) {
	
	}
		
}

class Player {
	public Player(string name, string ipAddr) {
		
	}
	string name;
	int gold;
	int income;
	
	Player alliance;
	Player war;
	
	List<Castle> castles;
	List<Unit> units;
	
	Set<Player> wars;
	
	string ipAddr;
	
	public string toJSON() {
		
	}
	public void setName(string name) {
		this.name = name;
	}
	public void name() {
		return name;
	}
	public void incrGold() {
		gold += income;
	}
	public int gold() {
		return gold;
	}
	public void purchase(string unitType) {
		//check gold
	}
	public void moveUnit(string x, string y) {
		
	}
	public void upgrade(string target) {
		//check gold
	}
	public List<Castle> castles() {
		
	}
	public List<Unit> units() {
		
	}
	public void ally(Player target) {
		
		//add all ally wars
	}
	public void backstab(Player target) {
		
		//remove all ally wars
	}
	
	public void war(Player target) {
		war = target;
		wars.add(war);
	}
	public void peace() {		
		
		//remove alliance member from wars from this war
		
		war = null;
	}
}

{
List<Player> players
connection logic
{
	players.add(new Player());
	//send player JSON data
}

message received logic
{
	
	parseLogic(JSON);
}

error received logic
{
	//resync user
}

disconnection logic
{
	players.remove(get player name);
}
}
