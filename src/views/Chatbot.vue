<script setup>
import { ref, nextTick, inject } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
const URL_API = inject("URL_API");

const input = ref("");
const messages = ref([{ from: "bot", text: "Chào bạn! Tôi có thể giúp gì cho bạn?" }]);
const messagesContainer = ref(null);

const streamingReply = ref("");
const isStreaming = ref(false);

function scrollToBottom() {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    }
  });
}

function addMessage(from, text) {
  messages.value.push({ from, text });
  scrollToBottom();
}

let eventSource = null;

function stopStreaming() {
  if (eventSource) {
    eventSource.close();
    eventSource = null;
    isStreaming.value = false;
    if (streamingReply.value) {
      addMessage("bot", streamingReply.value + "...");
      streamingReply.value = "";
    }
  }
}

async function sendMessage() {
  if (!input.value.trim()) return;

  const userMessage = input.value.trim();
  addMessage("user", userMessage);
  input.value = "";

  // Ngắt kết nối nếu đang tồn tại SSE
  if (eventSource) {
    eventSource.close();
    eventSource = null;
  }

  streamingReply.value = "";
  isStreaming.value = true;

  const url = new URL(`${URL_API}/api/chatbot`);
  url.searchParams.append("message", userMessage);

  eventSource = new EventSource(url.toString());

  eventSource.onmessage = (event) => {
    if (event.data === "[DONE]") {
      addMessage("bot", streamingReply.value);
      streamingReply.value = "";
      isStreaming.value = false;
      eventSource.close();
      eventSource = null;
      return;
    }
    streamingReply.value += event.data;
    scrollToBottom();
  };

  eventSource.onerror = (err) => {
    console.error("EventSource lỗi:", err);
    addMessage("bot", "Lỗi kết nối đến chatbot");
    streamingReply.value = "";
    isStreaming.value = false;
    if (eventSource) {
      eventSource.close();
      eventSource = null;
    }
  };
}
</script>

<template>
  <div id="chatbot" class="flex">
    <Sidebar />
    <div class="chatbot-main w-full flex-1">
      <Header :user="user" />
      <div class="chatbot-content">
        <div class="chat-container">
          <div class="messages" ref="messagesContainer">
            <div
              v-for="(msg, index) in messages"
              :key="index"
              :class="['message', msg.from]"
            >
              <div class="message-content leading-8" v-html="msg.text"></div>
            </div>

            <!-- Hiển thị streaming trả lời -->
            <div v-if="streamingReply" class="message bot typing">
              <div
                class="message-content leading-8"
                v-html="streamingReply + '<span class=cursor>|</span>'"
              ></div>
            </div>
          </div>

          <form @submit.prevent="sendMessage" class="input-area">
            <input
              v-model="input"
              type="text"
              placeholder="Nhập tin nhắn..."
              autocomplete="off"
              required
            />
            <!-- Nút dừng -->
            <button
              type="button"
              @click="stopStreaming"
              v-if="isStreaming"
              class="btn-stop-chatbot ml-2"
            >
              Dừng
            </button>
            <button
              v-else
              type="submit"
              :disabled="input.length === 0 || isStreaming"
              :class="{ disabled: input.length === 0 || isStreaming }"
              class="btn-submit-chatbot"
            >
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
