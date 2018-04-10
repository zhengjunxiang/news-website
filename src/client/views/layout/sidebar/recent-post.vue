<template>
  <div class="widget-wrap">
    <div class="widget-title">最新文章</div>
    <div class="widget-inner">
      <ul class="recent-post">
        <li v-for="(blog, ind) in blogs" v-if="ind < 5">
          <div class="item-thumbnail">
            <a href="#" class="thumbnail">
              <span :style="`background-image:url(${blog.cover})`" class="thumbnail-image"></span>
            </a>
          </div>
          <div class="item-inner">
            <p class="item-category">
              <a class="article-category-link" v-for="(tag, ind) in blog.tags" :href="`/tags/${tag}/`" v-if="ind < 2">
                <Tag type="border" color="blue">{{tag}}</Tag>
              </a>
            </p>
            <p class="item-title"><a href="/2018/02/11/third/" class="title">{{blog.title}}</a></p>
            <p class="item-date"><time datetime="2018-02-11T09:04:27.000Z" itemprop="datePublished">{{setDate(blog.updateAt)}}</time></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  name: "widget",
  computed: {
    ...mapGetters(['blogs'])
  },
  data: () => ({

  }),
  methods: {
    setDate(date) {
      return date.split('T')[0]
    }
  }
}
</script>
<style lang="less" scoped>
.widget {
  &-inner {
    line-height: 1.6em;
    word-wrap: break-word;
    font-size: 0.9em;
    color: #777;
    border-radius: 3px;
    li {
      padding: 10px 0 10px 85px;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      .item-thumbnail {
        margin-left: -85px;
        float: left;
        .thumbnail {
          width: 70px;
          height: 70px;
          display: block;
          position: relative;
          overflow: hidden;
          &-image {
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            background-size: cover;
            background-position: center;
          }
        }
      }
      .item-category {
        text-transform: uppercase;
        width: 100%;
        overflow: auto;
        .icon {
          margin-right: 5px;
        }
      }
      .item-title {
        a {
          color: #444;
          transition: all 0.2s ease;
        }
        margin: 4px 0;
        font-size: 15px;
      }
      .item-date {
        color: #999;
        font-size: 13px;
        text-transform: uppercase;
      }
    }
  }
}
</style>
