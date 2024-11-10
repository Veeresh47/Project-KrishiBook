import { Alert, Share, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { theme } from '../constants/theme';
import { hp, wp } from '../constants/helpers/common';
import Avatar from './Avatar';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'expo-image';
import { getSupabaseFileUrl } from '../services/imageService';
import { Video } from 'expo-av';
import { createPostLike, removePostLike } from '../services/postService';

const PostCard = ({
  item,
  currentUser,
  router,
  hasShadow = true,
  showMoreIcon = true,
}) => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    setLikes(item?.postLikes || []);
  }, [item]);

  const openPostDetails = () => {
    if (!showMoreIcon) return null;
    router.push({ pathname: 'postDetails', params: { postId: item?.id } });
  };

  const onShare = async () => {
    const content = { message: item?.body };
    Share.share(content);
  };

  const onLike = async () => {
    const liked = likes.some((like) => like.userId === currentUser?.id);

    if (liked) {
      // Remove like
      const updatedLikes = likes.filter((like) => like.userId !== currentUser?.id);
      setLikes(updatedLikes);

      const res = await removePostLike(item?.id, currentUser?.id);
      if (!res.success) {
        Alert.alert('Post', 'Something went wrong');
      }
    } else {
      // Add like
      const data = {
        userId: currentUser?.id,
        postId: item?.id,
      };
      setLikes((prevLikes) => [...prevLikes, data]);

      const res = await createPostLike(data);
      if (!res.success) {
        Alert.alert('Post', 'Something went wrong');
      }
    }
  };

  const liked = likes.some((like) => like.userId === currentUser?.id);

  const created_At = moment(item?.created_at).format('MMM D');

  return (
    <View style={[styles.container, hasShadow && styles.shadow]}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Avatar
            size={hp(4.5)}
            uri={item?.user?.image}
            rounded={theme.radius.md}
          />
          <View style={{ gap: 2 }}>
            <Text style={styles.userName}>{item?.user?.name}</Text>
            <Text style={styles.postTime}>{created_At}</Text>
          </View>
          {showMoreIcon && (
            <TouchableOpacity onPress={openPostDetails} style={{ marginLeft: wp(45) }}>
              <Icon name="ellipsis-h" size={hp(3.4)} strokeWidth={3} color={theme.colors.text} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Post media and content */}
      <View style={styles.content}>
        <View style={styles.postBody}>
          <Text>{item?.body}</Text>
          {item?.file && item?.file.includes('postImages') && (
            <Image source={getSupabaseFileUrl(item?.file)} transition={100} style={styles.postMedia} contentFit="cover" />
          )}

          {/* Post video */}
          {item?.file && item?.file.includes('postVideos') && (
            <Video
              style={[styles.postMedia, { height: hp(30) }]}
              source={getSupabaseFileUrl(item?.file)}
              useNativeControls
              resizeMode="cover"
              isLooping
            />
          )}
        </View>

        {/* Like, share, comment */}
        <View style={styles.footer}>
          <View style={styles.footerButton}>
            <TouchableOpacity onPress={onLike}>
              <Icon name="heart-o" size={24} color={liked ? theme.colors.rose : theme.colors.textLight} />
            </TouchableOpacity>
            <Text style={styles.count}>{likes?.length}</Text>
          </View>
          <View style={styles.footerButton}>
            <TouchableOpacity onPress={openPostDetails}>
              <Icon name="comments-o" size={24} color={theme.colors.textLight} />
            </TouchableOpacity>
            <Text style={styles.count}>{item?.comments[0]?.count}</Text>
          </View>
          <View style={styles.footerButton}>
            <TouchableOpacity onPress={onShare}>
              <Icon name="share-square-o" size={24} color={theme.colors.textLight} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 1,
  },
  count: {
    color: theme.colors.text,
    fontSize: hp(1.8),
  },
  footerButton: {
    flexDirection: 'row',
    marginLeft: 5,
    alignItems: 'center',
    gap: 4,
  },
  footer: {
    alignItems: 'center',
    gap: 18,
    flexDirection: 'row',
  },
  postBody: {
    marginLeft: 5,
  },
  container: {
    gap: 10,
    marginBottom: 15,
    borderRadius: theme.radius.xxl * 1.1,
    borderCurve: 'continuous',
    padding: 10,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderColor: '#0001',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontSize: hp(1.7),
    color: theme.colors.textDark,
    fontWeight: theme.fonts.medium,
  },
  postTime: {
    fontSize: hp(1.4),
    color: theme.colors.textLight,
    fontWeight: theme.fonts.medium,
  },
  content: {
    gap: 10,
  },
  postMedia: {
    height: hp(40),
    width: '100%',
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
    marginTop: 5,
  },
});
