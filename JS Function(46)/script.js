function nice(name) {
    console.log("Hey " +name + "you are nice!")
    console.log("Hey " +name + "you are nice!")
    console.log("Hey " +name + "you are nice!")
    console.log("Hey " +name + "you are nice!")
}

nice("Rohan")

nice("Shivam")


function sum(a,b){
    //console.log(a + b)
    return a + b 
}

result1 = sum(3,5)
result2 = sum(7,5)
result3 = sum(3,13,1)

console.log("The sum of these number is:",result1)
console.log("The sum of these number is:",result2)
console.log("The sum of these number is:",result3)

const func1 = (x)=>{
    console.log("I am an arrow function",x )
}

func1(34);
func1(66);
func1(84);