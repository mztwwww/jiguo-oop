/**
 * @description 鸡锅实体
 */
class PersonEntity {
    name;
    age;
    sex;
    description;
    car;
    constructor({ 
        name = "鸡锅", 
        age = 28, 
        sex = 1,
        description="开着《玛莎拉蒂MC20》的年轻成功人士",
        car=new Car()
    } = {}) {
      this.name = name;
      this.age = age;
      this.sex = sex===1?"男":"女";
      this.description=description;
      this.car=car;
    }
    walk() {
      alert(`\n\n${this.name}：走了`);
    }
    /**
     * @description 鸡锅介绍
     */
    introduce(){
        alert(`\n\n${this.name}：\n${this.age}岁\n性别：${this.sex}\n${this.description}`);
    }
    /**
     * @description 鸡锅上车
     */
    getInTheCar(){
        alert(`\n\n他来了，他来了，${this.name}他来了！他径直的走向了他的座驾\n➡\n${this.car.brand}\n/(ㄒoㄒ)/~~`);
        if(this.car.isGet===true){
            alert("鸡锅进入了他的座驾");
        }
    }
    /**
     * @description 鸡锅在路上行驶
     */
    onTheRoad(){
        alert(`\n\n${this.name}开着${this.car.brand},\n\n以每小时${this.car.topSpeed}的速度\n\n潇洒的在路上行驶\n\n\n完惹！o(*￣▽￣*)ブ`);
    }
}


/**
 * @description 车实体
 */
class Car{
    brand;
    topSpeed;
    isGet;
    constructor({
        brand='玛莎拉蒂MC20',
        topSpeed='325km/h',
        isGet=true,
    }={}){
        this.brand=brand;
        this.topSpeed=topSpeed;
        this.isGet=isGet;
    }
    /**
     * @description 鸡锅座驾介绍 
     */
    carintroduce(){
        alert(`\n\n鸡锅座驾介绍：\n${this.brand}：\n最高时速：${this.topSpeed}`);
    }
}


/**
 * @description 狗实体
 */
class DogEntity {
    name;
    constructor({ name = "花花" } = {}) {
        this.name = name;
    }
    wangwang() {
        alert(`\n\n${this.name}：旺旺~`);
    }
}


/**
 * @description 鸡锅走了，狗叫了
 */
class PersonViewModel {
    dog;
    person;
    constructor(){
      this.dog = new DogEntity();
      this.person = new PersonEntity();
    }
    dogAndPerson() {
      this.person.walk();
      this.dog.wangwang();
    }
}


/**
 * @description 鸡锅去开车，然后车在路上行驶
 */
class TravelViewModel{
    car;
    person;
    constructor(){
        this.car=new Car();
        this.person=new PersonEntity();
    }
    jiguoTravel(){
        this.person.introduce();
        this.car.carintroduce();
        this.person.getInTheCar();
        this.person.onTheRoad();
    }
}


/**
 * @description 鸡锅的二个实例
 */
class PersonViewModelAndTravelViewModel{
    personViewModel;
    travelViewModel;
    constructor(){
        this.personViewModel=new PersonViewModel();
        this.travelViewModel=new TravelViewModel();
    }
}

const Drive=()=>{
    const {personViewModel,travelViewModel}=new PersonViewModelAndTravelViewModel();
    return <div>
        <br/>
        ------------------------------------------------------------------------
        <br/>
        <div>《{personViewModel.person.name}》走了，狗《{personViewModel.dog.name}》叫了:</div>
        <div>
            <button onClick={() => personViewModel.dogAndPerson()}>{personViewModel.person.name}走了</button>
        </div>
        <br/>
        ------------------------------------------------------------------------
        <br/>
        <div>《{travelViewModel.person.name}》去开车，座驾《{travelViewModel.car.brand}》在路上行驶:</div>
        <div>
            <button onClick={() => travelViewModel.jiguoTravel()}>{travelViewModel.person.name}开车</button>
        </div>
    </div>
}

export default Drive;