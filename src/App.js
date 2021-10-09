// import {useEffect} from 'react';
import './App.css';
import dayjs from "dayjs";
import {makeAutoObservable} from "mobx";
import {observer,useLocalStore} from "mobx-react-lite";

// 原始数据
const dataList=[
  {
    id:Math.random(),
    item:"鸡锅0",
    datetime:dayjs().format("YYYY-MM-DD"),
    isFinished:false
  },
  {
    id:Math.random(),
    item:"鸡锅1",
    datetime:dayjs().format("YYYY-MM-DD"),
    isFinished:false
  },
  {
    id:Math.random(),
    item:"鸡锅2",
    datetime:dayjs().format("YYYY-MM-DD"),
    isFinished:true
  }
]

// 声明
class Todo{
  id;
  item;
  datetime;
  isFinished;
  constructor({
    id=Math.random(),
    item="",
    datetime=dayjs().format("YYYY-MM-DD"),
    isFinished=false
  }){
    this.id=id;
    this.item=item;
    this.datetime=datetime;
    this.isFinished=isFinished;
  }
}

// 数据操作
class TodoService{
  list;
  constructor(){
    this.list=[];
    for(let i=0;i<dataList.length;i++){
      this.list.push(new Todo(dataList[i]));
    }
  }
  async getList() {
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(this.list);
      }, 300);
    });
  }
  async addTodo(todo) {
    this.list.push(todo);
    return new Promise((resovle) => {
        resovle(true);
        console.log(this.list);
    });
  }
  async Finish(index) {
    this.list[index].isFinished=true;
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(true);
      }, 300);
    });
  }
  async Delete(index) {
    this.list.splice(index,1);
    return new Promise((resovle) => {
      setTimeout(() => {
        resovle(true);
      }, 300);
    });
  }
}


// 监听
class TodoViewModel{
  service;
  TitleText;
  list;
  item;
  isFinished;
  Show;
  
  constructor(){
    makeAutoObservable(this);
    this.service=new TodoService();
    this.TitleText="123?";
    this.list=[];
    this.item="";
    this.isFinished=false;
    this.Show={
      display:1,
      button_display:1
    };
    this.loadData();
  }
  async getList(){
    return await this.service.getList();
  }
  async loadData(){
      this.list=[];
      this.list=await this.getList();
  }
  async addTodo(item){
      if(await this.service.addTodo(new Todo({item}))) {
        this.loadData();
        console.log(this.list);
      }
  }
  async Finish(index){
      this.list=[];
      if(await this.service.Finish(index)){
          this.loadData();
      }
  }
  async Delete(index){
      this.list=[];
      if(await this.service.Delete(index)){
        this.loadData();
      }
  }
    // 显示全部任务
  async ShowAll(){
      this.Show.display=1;
      this.loadData();
  }
    // 显示进行中全部任务
  async Progressing(e){
      this.TitleText=e.target.innerText;
      this.list=[];
      this.Show.display=0;
      this.Show.button_display=1;
      this.loadData();
  }
    // 显示完成的任务
    async Completed(e){
      this.TitleText=e.target.innerText;
      this.list=[];
      this.Show.display=0;
      this.Show.button_display=0;
      this.loadData();
    }
}
class TodoViewModelSingle {
  todoViewModel;
  static CreateInstance() {
    if (this.todoViewModel === undefined) {
      this.todoViewModel = new TodoViewModel();
    }
    return this.todoViewModel;
  }
}

const TodoList=observer(()=>{
  const todolist=useLocalStore(()=>TodoViewModelSingle.CreateInstance());
  // todolist只渲染一次
  // useEffect(()=>{
  //   console.log(todolist.list.length);
  //   todolist.loadData();
  // },[todolist]);

  return (
    <div className="App">
      <input
        placeholder="输入添加的任务"
        onInput={(e)=>(todolist.item=e.target.value)}
      ></input>
      <button
        onClick={()=>todolist.addTodo(todolist.item)}
      >添加任务</button>
      {
       todolist.Show.display===1?
        <div>
            <div className="div_style">
            <h3>进行中的任务</h3>
            {todolist.list.length<=0?(
              <div className="div_style1">加载中...</div>
            ):(
              <ul className="list_style">
              {
                todolist.list.map((value,index)=>{
                  if(value.isFinished===false){
                    return (
                      <li key={value.id}>
                        <p>{value.item}--{value.datetime}</p>
                        <button onClick={()=>todolist.Finish(index)}>已完成</button>
                        <button onClick={()=>todolist.Delete(index)}>删除任务</button>
                      </li>
                    )
                  }else{
                    return false;
                  }
                })
              }
            </ul>
            )}
          </div>
          <div className="div_style">
            <h3>已完成的任务</h3>
            {todolist.list.length<=0?(
              <div className="div_style1">加载中...</div>
            ):(
          <ul className="list_style list_style1">
          {
              todolist.list.map((value)=>{
                if(value.isFinished===true){
                  return (
                    <li key={value.id}>
                      <p>{value.item}--{value.datetime}</p>
                    </li>
                  )
                }else{
                  return false;
                }
              })
          }
          </ul>
            )}
          </div>
        </div>
        :
        <div>
           <div>
           {todolist.Show.button_display===1?(
            <div>
              <h3>{todolist.TitleText}</h3>
              {todolist.list.length<=0?(
                <div className="div_style1">加载中...</div>
              ):(
                <ul className='list_style list_style2'>
                  {
                    todolist.list.map((value,index)=>{
                      if(value.isFinished===false){
                          return (
                            <li key={value.id}>
                              <p>{value.item}--{value.datetime}</p>
                              <button onClick={()=>todolist.Finish(index)}>已完成</button>
                              <button onClick={()=>todolist.Delete(index)}>删除任务</button>
                            </li>
                          )
                      }else{
                        return false;
                      }
                    })
                  }
                </ul>
              )}
              </div>
            ):(
              <div>
              <h3>{todolist.TitleText}</h3>
              {todolist.list.length<=0?(
                <div className="div_style1">加载中...</div>
              ):(
                <ul className='list_style list_style2'>
                  {
                    todolist.list.map((value)=>{
                      if(value.isFinished===true){
                        return (
                          <li key={value.id}>
                            <p>{value.item}--{value.datetime}</p>
                          </li>
                        )
                      }else{
                      return false;
                      }
                    })
                  }
              </ul>
              )}
            </div>
            )}
        </div>
        </div>
      }
      <div>
        <h3>查看任务</h3>
        <button onClick={todolist.ShowAll} className="button_style">显示全部任务</button>
        <button onClick={(e)=>todolist.Progressing(e)} className="button_style">进行中的任务</button>
        <button onClick={(e)=>todolist.Completed(e)} className="button_style">已完成的任务</button>
      </div>
    </div>
  );
});

const App=()=> {
  return <TodoList></TodoList>
}

export default App;
