<template>
  <li>
    <h1>{{ fullName }}</h1>
    <h4>${{ rate }}/hour</h4>
    <div>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </div>
    <div class="actions">
      <base-button link mode="outline" :to="coachesContactLink"
        >Contact</base-button
      >
      <base-button link :to="coachesDetailsLink">Contact Details</base-button>
    </div>
  </li>
</template>
<script>
import BaseButton from '../ui/BaseButton.vue';
export default {
  components: { BaseButton },
  props: ['id', 'firstName', 'lastName', 'rate', 'areas', 'description'],
  computed: {
    fullName() {
      return this.firstName + ' ' + this.lastName;
    },
    coachesContactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    },
    coachesDetailsLink() {
      return this.$route.path + '/' + this.id;
    },
  },
};
</script>
<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
