<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handelError"
      >{{ error }}</base-dialog
    >

    <section>
      <base-card>
        <header><h2>Requests Received</h2></header>
        <base-spinner v-if="isLoading"></base-spinner>

        <ul v-else-if="hasRequests && !isLoading">
          <requests-item
            v-for="req in receivedRequest"
            :key="req.id"
            :message="req.message"
            :email="req.userEmail"
          ></requests-item>
        </ul>
        <h3 v-else>You haven't Received any request yet!</h3>
      </base-card>
    </section>
  </div>
</template>
<script>
import RequestsItem from '../../components/requests/RequestsItem.vue';
import BaseDialog from '../../components/ui/BaseDialog.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
export default {
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  components: { RequestsItem, BaseDialog, BaseSpinner },
  computed: {
    receivedRequest() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return this.$store.getters['requests/hasRequest'];
    },
  },
  created() {
    this.loadRequests();
  },
  methods: {
    async loadRequests() {
      this.isLoading = true;
      try {
        await this.$store.dispatch('requests/fetchRequest');
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.error = error || 'Something failed!';
      }
    },
    handelError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
