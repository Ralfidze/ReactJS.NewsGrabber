class Developer {
    constructor(firstName, lastName){
        this.firstName=firstName;
        this.lastName=lastName;
    }
    getName(){
        return this.firstName + ' ' + this.lastName;  
    }
}
export default Developer;