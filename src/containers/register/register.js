/*
注册路由
*/
import React,{Component} from 'react';
import {NavBar,
		WingBlank,
		List,
		InputItem,
		WhiteSpace,
		Radio,
	    Button,} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {register} from '../../redux/actions'
import Logo from '../../components/logo/logo';

const ListItem = List.Item

class Register extends Component {
	state = {
		username:'',
		password:'',
		password2:'',
		type:'',
	}
	
	register = () =>{
		//console.log(this.state)
		this.props.register(this.state)
	}
	tologin = () =>{
		this.props.history.replace('/login')
	}
	// 处理输入数据的改变:更新对应的状态
	handleChange = (name,val) => {
		//更新状态
		this.setState({
			[name]:val //属性名不是name而是name的值
		})
	}
   render(){
	   const {type} = this.state
	   const {msg,redirectTo} = this.props.user
	   if (redirectTo){
	   	return <Redirect to={redirectTo}/>
	   }
       return (
          <div>
		     <NavBar>搞&nbsp;事&nbsp;就&nbsp;行</NavBar>
		     <Logo/>
		     <WingBlank size="lg">
		         <List>
					 {msg ? <div className='error-msg'>{msg}</div> : null}
		            <WhiteSpace/>
		            <InputItem placeholder='请输入用户名' onChange={val => {this.handleChange('username',val)}}>用户名:</InputItem>
		            <WhiteSpace/>
		            <InputItem placeholder='请输入密码' type="password" onChange={val => {this.handleChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
		            <WhiteSpace/>
		            <InputItem placeholder='请输入确认密码' type="password" onChange={val => {this.handleChange('password2',val)}}>确认密码:</InputItem>
		            <WhiteSpace/>
		            <ListItem>
		                <span>用户类型：</span>
		                &nbsp;&nbsp;&nbsp;
		                <Radio checked={type==='dashen'} onChange={() => this.handleChange('type','dashen')}>大神</Radio>
		                &nbsp;&nbsp;&nbsp;
		                <Radio checked={type==='laoban'} onChange={() => this.handleChange('type','laoban')}>老板</Radio>
		            </ListItem>
		            <WhiteSpace/>
		            <Button type="primary" onClick={this.register}>注册</Button>
		            <WhiteSpace/>
		            <Button onClick={this.tologin}>已有账户</Button>
		         </List>
		     </WingBlank>
		  </div>
       )
   }
}

export default connect(
	state => ({user:state.user}),
	{register}
)(Register)