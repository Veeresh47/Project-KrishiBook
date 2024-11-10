import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import ScreenWrapper from '../../components/ScreenWrapper';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { createComment, fetchPostDetails } from '../../services/postService';
import { hp, wp } from '../../constants/helpers/common';
import { theme } from '../../constants/theme';
import PostCard from '../../components/PostCard';
import { useAuth } from '../../contexts/AuthContext';
import Loading from '../../components/Loading';
import Input from '../../components/Input';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const PostDetails = () => {
  const { postId } = useLocalSearchParams();
  const [post, setPost] = useState(null);
  const { user } = useAuth();
  const [startLoading, setStartLoading] = useState(true);
  const router = useRouter();
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const commentRef = useRef('');

  useEffect(() => {
    getPostDetails();
  }, []);

  const getPostDetails = async () => {
    try {
      let res = await fetchPostDetails(postId);
      if (res.success) {
        setPost(res.data);
      } else {
        Alert.alert('Error', 'Failed to fetch post details');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
    } finally {
      setStartLoading(false);
    }
  };

  const onNewComment = async () => {
    if (!commentRef.current.trim()) return null;
    const data = {
      text: commentRef.current,
      postId: post?.id,
      userId: user?.id,
    };
    
    setLoading(true);
    try {
      let res = await createComment(data);
      if (res.success) {
        commentRef.current = ''; // Clear input after successful comment
        inputRef.current.clear(); // Clear input field visually
      } else {
        Alert.alert('Comment', res.msg);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to post the comment');
    } finally {
      setLoading(false);
    }
  };

  if (startLoading) {
    return (
      <View style={styles.center}>
        <Loading />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
        <PostCard
          item={post}
          currentUser={user}
          hasShadow={false}
          router={router}
          showMoreIcon={false}
        />
        <View style={styles.inputContainer}>
          <Input
            inputRef={inputRef}
            placeholder="Type a comment..."
            onChangeText={(value) => (commentRef.current = value)}
            placeholderTextColor={theme.colors.textLight}
            containerStyle={{ flex: 1, height: hp(6.2), borderRadius: theme.radius.xl }}
          />
          {loading ? (
            <View style={styles.loading}>
              <Loading size="small" />
            </View>
          ) : (
            <TouchableOpacity style={styles.sendIcon} onPress={onNewComment}>
              <Icon name="send" color={theme.colors.primaryDark} />
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default PostDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: wp(7),
    backgroundColor: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  list: {
    paddingHorizontal: wp(4),
  },
  sendIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.8,
    borderColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    height: hp(5.8),
    width: hp(5.8),
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  notFound: {
    fontSize: hp(2.5),
    color: theme.colors.text,
    fontWeight: theme.fonts.medium,
  },
  loading: {
    height: hp(5.8),
    width: hp(5.8),
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ scale: 1.3 }],
  },
});