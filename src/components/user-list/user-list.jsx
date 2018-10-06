/*
显式指定用户列表的UI组件
 */
import React,{Component} from 'react'
import {WingBlank,WhiteSpace,Card} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
const Header = Card.Header
const Body = Card.Body

class UserList extends Component{
    static propTypes = {
        userList:PropTypes.array.isRequired
    }
    render() {
        const {userList} =this.props
        return (
            <WingBlank style={{marginBottom:50,marginTop:50}}>
                {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
                <QueueAnim type='scale'>
                    {
                        userList.map((user) => (
                            <div key={user._id}>
                                <WhiteSpace/>
                                <Card onClick={() => this.props.history.push(`/chat/${user._id}`)}>
                                    <Header
                                        thumb={user.header?require(`../../assets/images/${user.header}.png`):null}
                                        extra={user.username}
                                    />
                                    <Body>
                                    <div>职位:{user.post}</div>
                                    {user.company ? <div>公司:{user.company}</div> : null}
                                    {user.salary ? <div>月薪:{user.salary}</div> : null}
                                    <div>描述:{user.info}</div>
                                    </Body>
                                </Card>
                            </div>
                        ))
                    }
                </QueueAnim>

            </WingBlank>
        )
    }
}

export default withRouter(UserList)