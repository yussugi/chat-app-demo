import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { postListState, messageState, PostState } from './recoil/ChatState'
import { API, graphqlOperation, Analytics } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'
import { listPostsSortedByCreatedAt } from './graphql/queries'
import { createPost } from './graphql/mutations'
import { onCreatePost } from './graphql/subscriptions'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Chip from '@material-ui/core/Chip'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { CreatePostMutation, ListPostsSortedByCreatedAtQuery } from './API'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(10),
      backgroundColor: 'white',
    },
    userName: {
      fontFamily: 'Arial',
      fontSize: '2.0rem',
      display: 'flex',
      justifyContent: 'flex-start',
      paddingBottom: theme.spacing(1),
    },
    input: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
      flexDirection: 'row',
      width: '360'
    },
    inputField: {
      display: 'flex',
      justifyContent: 'flex-start',
      width: '360'
    },
    sendButton: {
      display: 'flex',
    },
    myMessage: {
      display: 'flex',
      justifyContent: 'flex-start',
    },
    otherMessage: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  }),
)

interface ContentProps {
  userName?: string
}

const Content = (props: ContentProps) => {
  const classes = useStyles()
  const [posts, setPosts] = useRecoilState(postListState)
  const [message, setMessage] = useRecoilState(messageState)

  const handleClick = () => {
    Analytics.record({
      name: "click_send"
    })
    postPost()
  }

  const postPost = async () => {
    const post = (await API.graphql(
      graphqlOperation(createPost, {
        input: { message: message, owner: 'chat', user: props.userName },
      }),
    )) as GraphQLResult<CreatePostMutation>
    const postData = post.data?.createPost as PostState
    setPosts([...posts, postData])
    setMessage('')
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value)
  }

  useEffect(() => {
    async function getPosts() {
      const res = (await API.graphql(
        graphqlOperation(listPostsSortedByCreatedAt, { owner: 'chat' }),
      )) as GraphQLResult<ListPostsSortedByCreatedAtQuery>
      const postData = res?.data?.listPostsSortedByCreatedAt
        ?.items as PostState[]
      setPosts(postData)
    }
    getPosts()
  }, [setPosts])

  useEffect(() => {
    // @ts-ignore
    const subscription = API.graphql(graphqlOperation(onCreatePost)).subscribe({
      next: (eventData: any) => {
        const post = eventData.value.data.onCreatePost
        if (post !== undefined && post.user !== props.userName) {
          setPosts([...posts, post])
        }
      },
    })
    return () => subscription.unsubscribe()
  }, [posts])

  const postList: JSX.Element[] = []

  for (const post of posts) {
    if (post.user === props.userName) {
      postList.push(
        <ListItem key={post.id} className={classes.myMessage}>
          <Chip label={post.message}></Chip>
        </ListItem>,
      )
    } else {
      postList.push(
        <ListItem key={post.id} className={classes.otherMessage}>
          <Chip label={post.message}></Chip>
        </ListItem>,
      )
    }
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <div className={classes.userName}>{props.userName} chat room</div>
      <div className={classes.input}>
        <div className={classes.inputField}>
          <TextField
            value={message}
            onChange={handleChange}
            label="チャット入力欄"
            placeholder="文字を入力してください"
            multiline
            style={{width: 360}}
          />
        </div>
        <div className={classes.sendButton}>
          <Button variant="contained" color="secondary" onClick={handleClick}>
            送信
          </Button>
        </div>
      </div>
      <List>{postList}</List>
    </Container>
  )
}

export default Content
