<template>
  <div>
    <base-dialog
      :show="!!error"
      title="An error occurred!"
      @close="handelError"
      >{{ error }}</base-dialog
    >
    <base-spinner v-if="isLoading"></base-spinner>

    <form @submit.prevent="submitForm" v-else>
      <div class="form-control" :class="{ errors: !email.isValid }">
        <label for="email">Your E-mail </label>
        <input
          type="email"
          id="email"
          v-model.trim="email.val"
          @blur="clearValidity('email')"
        />
        <p v-if="!email.isValid">Email most not be empty.</p>
      </div>

      <div class="form-control" :class="{ errors: !message.isValid }">
        <label for="message">Message</label>
        <textarea
          type="text"
          id="message"
          rows="5"
          v-model.trim="message.val"
          @blur="clearValidity('message')"
        />
        <p v-if="!message.isValid">Message most not be empty.</p>
      </div>
      <div class="actions">
        <base-button>Send Message</base-button>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isLoading: false,
      error: null,
      email: {
        val: '',
        isValid: true,
      },
      message: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validateForm() {
      this.formIsValid = true;
      if (this.message.val === '' || !this.email.val.includes('@')) {
        this.message.isValid = false;
        this.formIsValid = false;
      }
      if (this.email.val === '') {
        this.email.isValid = false;
        this.formIsValid = true;
      }
    },
    async submitForm() {
      this.isLoading = true;
      this.validateForm();

      if (!this.formIsValid) {
        return;
      }
      try {
        await this.$store.dispatch('requests/contactCoach', {
          coachId: this.$route.params.id,
          email: this.email.val,
          message: this.message.val,
        });
        this.isLoading = false;
        this.$router.replace('/coaches');
      } catch (error) {
        this.isLoading = false;

        this.error = error || 'can not be insert data!';
      }
    },
    handelError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors p {
  font-weight: bold;
  color: red;
}
.errors input,
.errors textarea {
  border-color: red;
}

.actions {
  text-align: center;
}
</style>
