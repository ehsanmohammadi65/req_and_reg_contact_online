<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handelError"
      >{{ error }}</base-dialog
    >
    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>
    <section v-else>
      <h2>Register as a coach now!</h2>

      <base-card>
        <coaches-form @save-data="saveData"></coaches-form
      ></base-card>
    </section>
  </div>
</template>
<script>
import CoachesForm from '../../components/coaches/CoachesForm.vue';
import BaseSpinner from '../../components/ui/BaseSpinner.vue';
export default {
  data() {
    return {
      error: null,
      isLoading: false,
    };
  },
  components: { CoachesForm, BaseSpinner },
  computed: {},
  methods: {
    async saveData(data) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/registerCoaches', data);
        this.isLoading = false;

        this.$router.replace('/coaches');
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
        this.isLoading = false;
      }
    },
    handelError() {
      this.error = null;
    },
  },
};
</script>
