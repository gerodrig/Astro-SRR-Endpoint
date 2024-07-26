<template>
  <Loading v-if="isLoading" />

  <button v-else-if="likeCount === 0" @click="likePost">Like this Post</button>
  <button v-else @click="likePost">
    Likes
    <span>{{ likeCount }}</span>
  </button>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import Loading from '@/components/likes/Loading.vue';
import confetti from 'canvas-confetti';
import debounce from 'lodash.debounce';
import { actions } from 'astro:actions';

type Props = {
  postId: string;
};

const props = defineProps<Props>();

const likeCount = ref(0);
const likeClicks = ref(0);
const isLoading = ref(true);

watch(likeCount, debounce(async() => {
  // fetch(`/api/posts/likes/${props.postId}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ likes: likeClicks.value }),
  // });

  //! Using Server Actions
  const response = actions.updatePostsLikes({
    postId: props.postId,
    likes: likeClicks.value,
  });

  console.log(response);

  likeClicks.value = 0;
}, 500))

const likePost = () => {
  likeCount.value++;
  likeClicks.value++;

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { x: Math.random(), y: Math.random() - 0.2 },
  });
};

const getCurrentLikes = async () => {
  //? Using Fetch API
  // const response = await fetch(`/api/posts/likes/${props.postId}`);

  // if (!response.ok) {
  //   throw new Error('Failed to fetch likes');
  // }

  // const data = await response.json();
  // likeCount.value = data.likes;

  //? Using Server Actions
  const { likes } = await actions.getPostLikes(props.postId);

  likeCount.value = likes;
  isLoading.value = false;
};

getCurrentLikes();
</script>

<style scoped>
button {
  background-color: #5e51bc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background-color: #4a3f9a;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}
</style>
