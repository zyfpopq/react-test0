import React,{Component} from 'react'
import {connect} from 'react-redux'
import {NavBar,List,InputItem,Grid,Icon} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'
import {sendMsg,readMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component{

    state = {
        content:'',
        isShow:false //是否显示表情列表
    }

    // 在第一次render（）之前回调
    componentWillMount() {
        //初始化表情列表数据
        const emojis = ['😀','😁','😂','🤣','😃','😄','😅','😁'
            ,'😂','🤣','😃','😄','😅','😁','😂','🤣'
            ,'😃','😄','😅','😁','😂','🤣','😃','😄'
            ,'😅','😁','😂','🤣','😃','😄','😅','😁'
            ,'😂','🤣','😃','😄','😅','😁','😂','🤣'
            ,'😃','😄','😅','😁','😂','🤣','😃','😄'
            ,'😅','😁','😂','🤣','😃','😄','😅','😀']
        this.emojis = emojis.map(emoji => ({text:emoji}))
    }

    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0,document.body.scrollHeight)
    }

    componentDidUpdate(){
        //更新列表显示
        window.scrollTo(0,document.body.scrollHeight)
    }

    componentWillUnmount () {//退出之前更新
        //发请求更新消息的未读状态
        const from = this.props.match.params.userid
        const to = this.props.user._id
        this.props.readMsg(from,to)
    }

    toggleShow = () => {
        const isShow = !this.state.isShow
        this.setState({
            isShow
        })
        if (isShow){
            //异步手动派发resize事件(改变尺寸的事件)，解决表情列表显示的bug
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            },0)
        }
    }

    handleSend = () =>{
        //收集数据
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()
        //发送请求(发消息)
        if (content) {
            this.props.sendMsg({from,to,content})
        }
        //清除输入数据
        this.setState({
            content:'',
            isShow:false
        })
    }
    render() {
        const {user} = this.props
        const {users,chatMsgs} = this.props.chat

        //计算当前聊天的chatId
        const meId = user._id
        if (!users[meId]){ //如果还没有获取到数据,直接不做任何显示
            return null
        }
        const targetId = this.props.match.params.userid
        const chatId = [meId,targetId].sort().join('_')

        //对chatMsgs进行过滤
        const msgs = chatMsgs.filter(msg =>msg.chat_id===chatId)

        //得到目标用户的头像
        const targetHeader = users[targetId].header
        const targetIcon = targetHeader ? require(`../../assets/images/${targetHeader}.png`) : null
        //用户自身的头像
        const userHeader = user.header
        const userIcon = require(`../../assets/images/${userHeader}.png`)

        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type='left'/>}
                    className='stick-header'
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[targetId].username}
                </NavBar>
                <List style={{marginTop:50,marginBottom:50}}>
                    {/*alpha left right top bottom scale scaleBig scaleX scaleY*/}
                    <QueueAnim type='scale'>
                        {
                            msgs.map(msg =>
                            {
                                if (meId===msg.to) {//对方发给我的
                                    return (
                                        <Item
                                            key={msg._id}
                                            thumb={targetIcon}
                                        >
                                            {msg.content}
                                        </Item>)
                                }else {//我发给对方的
                                    return(
                                        <Item
                                            key={msg._id}
                                            className='chat-me'
                                            extra={<img src={userIcon} alt={meId}/>}
                                        >
                                            {msg.content}
                                        </Item>)

                                }
                            })
                        }
                    </QueueAnim>
                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        placeholder='请输入'
                        value={this.state.content}
                        onChange={val => this.setState({content:val})}
                        onFocus={() => this.setState({isShow:false})}
                        extra={
                            <span>
                                <span onClick={this.toggleShow} style={{marginRight:5}}>😄</span>
                                <span onClick={this.handleSend}>发送</span>
                            </span>
                        }
                    />
                    {this.state.isShow ? (
                        <Grid
                            data={this.emojis}
                            columnNum={8}
                            carouselMaxRow={4}
                            isCarousel={true} //是否显示轮播的效果，是否超过4*8个
                            onClick={(item) => {
                                this.setState({content: this.state.content + item.text})
                            }}
                        />
                    ) : null}
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({user:state.user,chat:state.chat}),
    {sendMsg,readMsg}
)(Chat)