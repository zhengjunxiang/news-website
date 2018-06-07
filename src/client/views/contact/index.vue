<template>
<div class="contact-us">
  <div class="main-body-header">
    <h2 class="header">{{$t('content.contactUs')}}</h2>
  </div>
  <div class="main-body-content">

    <div class="poster-box" v-if="details.cover">
      <a :href="details.link" v-if="details.link" target="_blank"><img :src="details.cover" alt="" /></a>
      <img :src="details.cover" alt="" v-else />
    </div>

    <article class="article article-single article-type-post" itemprop="newPost">
      <div class="article-inner">
        <footer class="article-footer">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <FormItem :label="$t('contact.name')" prop="name">
              <Input v-model="formValidate.name" placeholder="Enter your name"></Input>
            </FormItem>
            <FormItem :label="$t('contact.mail')" prop="mail">
              <Input v-model="formValidate.mail" placeholder="Enter your e-mail"></Input>
            </FormItem>
            <FormItem :label="$t('contact.industry')" prop="industry">
              <Input v-model="formValidate.industry" placeholder="Enter your industry"></Input>
            </FormItem>
            <FormItem :label="$t('contact.country')" prop="country">
              <Input v-model="formValidate.country" placeholder="Enter your country" />
            </FormItem>
            <FormItem :label="$t('contact.city')" prop="city">
              <Input v-model="formValidate.city" placeholder="Enter your city" />
            </FormItem>
            <FormItem :label="$t('contact.interest')" prop="interest">
              <CheckboxGroup v-model="formValidate.interest">
                <Checkbox label="On-line Contributions">{{$t('contact.online')}}</Checkbox>
                <Checkbox label="Advertising">{{$t('contact.advert')}}</Checkbox>
                <Checkbox label="Mining Consult">{{$t('contact.consult')}}</Checkbox>
                <Checkbox label="Others">{{$t('contact.others')}}</Checkbox>
              </CheckboxGroup>
            </FormItem>
            <FormItem :label="$t('contact.message')" prop="message">
              <Input v-model="formValidate.message" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">{{$t('contact.submit')}}</Button>
            </FormItem>
          </Form>
        </footer>
      </div>
    </article>
  </div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: 'about',
  data() {
    return {
      datas: [],
      formValidate: { name: '', mail: '', industry: '', country: '', city: '', interest: [], message: '' },
      ruleValidate: {
        name: [ { required: true, message: 'The name cannot be empty', trigger: 'blur' } ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        industry: [ { required: true, message: 'industry cannot be empty', trigger: 'blur' } ],
        country: [ { required: true, message: 'Please select the country', trigger: 'blur' } ],
        city: [ { required: true, message: 'Please select the city', trigger: 'blur' } ],
        interest: [ { required: true, type: 'array', min: 1, message: 'Choose at least one interest', trigger: 'change' } ],
        message: [
          { required: true, message: 'Please enter a message', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['posters', 'lan']),
    details() {
      return this.posters.filter(p => p.type === 'details')[0] || {}
    }
  },
  async mounted() {
    const res = await this.$store.dispatch('getAbout');
    this.datas = res.data;
    window.socialShare('.social-share-about')
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate(async (valid) => {
        if (valid) {
          let verify = true
          Object.keys(this.formValidate).forEach(key => {
            if (this.$U.mapScript(this.formValidate[key])) {
              if (lan === 'zh') this.$Message.warning('有敏感字符')
              else this.$Message.warning('Sensitive character')
              verify = false
            }
          })
          if (verify === false) return;
          const res = await this.$store.dispatch('addContact', this.formValidate)
          this.$refs[name].resetFields()
          if (res.mes) this.$Message.success(res.mes)
        } else this.$Message.error('Fail!');
      })
    }
  }
};
</script>
<style lang="less">
.contact-us {
    .main-body-header {
        background: #F7F7F7;
    }
    .header {
        text-align: center;
        font-size: 32px;
        line-height: 34px;
        padding: 5px 0;
    }
    .article-footer {
      padding-top: 30px;
      .ivu-form-item-label {
        text-align: left;
        width: 100%;
      }
      .ivu-form {
        width: 80%;
        margin: 0 auto;
      }
    }
}
</style>
