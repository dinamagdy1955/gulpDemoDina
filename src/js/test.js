class Person {
    constructor(fname, lname) {
       this.fname = fname;
       this.lname = lname;
    }
 
    get fullname() {
       return this.fname +"/"+this.lname;
    }
 }
 console.lo(new Person("Dina","Magdy"));
