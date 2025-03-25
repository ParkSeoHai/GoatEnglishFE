<script setup></script>

<template>
  <div class="cards">
    <div class="card-single">
      <div>
        <h1>100</h1>
        <span>Người dùng mới</span>
      </div>
      <div>
        <span><i class="bi bi-people"></i></span>
      </div>
    </div>
    <div class="card-single">
      <div>
        <h1>200</h1>
        <span>Bài học</span>
      </div>
      <div>
        <span><i class="bi bi-book-half"></i></span>
      </div>
    </div>
    <div class="card-single">
      <div>
        <h1>555</h1>
        <span>Tài khoản</span>
      </div>
      <div>
        <span><i class="bi bi-person-add"></i></span>
      </div>
    </div>
    <div class="card-single">
      <div>
        <h1>999</h1>
        <span>Lượt mượn sách</span>
      </div>
      <div>
        <span><i class="bi bi-cart-plus"></i></span>
      </div>
    </div>
  </div>
  <div class="recent-grid">
    <div class="books">
      <div class="card">
        <div class="card-header">
          <h3 class="lv3">Bài học mới</h3>
          <button>
            <a href="quanlysach/index.html">
              See all<span class="las la-arrow-right"></span>
            </a>
          </button>
        </div>
        <div class="card-body">
          <div class="table-responsive">
            <table width="100%">
              <thead>
                <tr>
                  <td>Tên sách</td>
                  <td>Tác giả</td>
                  <td>Thể loại</td>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="customers">
      <div class="card">
        <div class="card-header">
          <h3 class="lv3">Người dùng mới</h3>
          <button>
            <a href="/quan-ly-nguoi-dung/doc-gia">
              See all<span class="las la-arrow-right"></span>
            </a>
          </button>
        </div>
        <div class="card-body">
          <div class="customer">
            <div class="info">
              <img
                src="https://avatars.githubusercontent.com/u/105920262?v=4"
                class="logo"
                width="40px"
                height="40px"
              />
              <div>
                <h4 class="lv4">usahhdhwuhu@gmail.com</h4>
                <small>dhuwak</small>
              </div>
            </div>
            <div class="contact">
              <span><i class="bi bi-person-circle"></i></span>
              <span><i class="bi bi-chat-square-text"></i></span>
              <span><i class="bi bi-telephone"></i></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
