/*
登陆路由
*/
import React,{Component} from 'react';
import {NavBar,
		WingBlank,
		List,
		InputItem,
		WhiteSpace,
	    Button,} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'
import Logo from '../../components/logo/logo';


class Login extends Component {
	state = {
		username:'',
		password:'',
		type:'',
	}
	login = () =>{
		this.props.login(this.state)
	}
	toregister = () => {
		this.props.history.replace('/register')
	}
	handleChange = (name,val) => {
		//更新状态
		this.setState({
			[name]:val //属性名不是name而是name的值
		})
	}
   render(){
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
		            <Button type="primary" onClick={this.login}>登陆</Button>
		            <WhiteSpace/>
		            <Button onClick={this.toregister}>注册账号</Button>
		         </List>
		     </WingBlank>
		  </div>
       )
   }
}

export default connect(
    state => ({user:state.user}),
    {login}
)(Login)