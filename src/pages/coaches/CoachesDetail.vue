<template>
  <div>
    <section>
      <base-card>
        <h2>{{ fullName }}</h2>
        <h3>${{ rate }}/hour</h3>
      </base-card>
    </section>
    <section>
      <base-card>
        <header>
          <h2>Interested? Reach Out Now!</h2>
        </header>
        <router-view></router-view>
      </base-card>
    </section>
    <section>
      <base-card>
        <base-badge
          v-for="area in areas"
          :key="area"
          :type="area"
          :title="area"
        ></base-badge>
        <p>{{ description }}</p>
      </base-card>
    </section>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedCoaches: null,
    };
  },
  computed: {
    fullName() {
      return (
        this.selectedCoaches.firstName + ' ' + this.selectedCoaches.lastName
      );
    },
    contactLink() {
      return this.$route.path + '/' + this.id + '/contact';
    },
    areas() {
      return this.selectedCoaches.areas;
    },
    rate() {
      return this.selectedCoaches.hourlyRate;
    },
    description() {
      return this.selectedCoaches.description;
    },
  },
  created() {
    this.selectedCoaches = this.$store.getters['coaches/coaches'].find(
      (coach) => coach.id == this.id
    );
  },
};
</script>
