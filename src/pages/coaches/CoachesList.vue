<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred!" @close="handelError"
      ><p>{{ error }}</p></base-dialog
    >
    <section>
      <coaches-filter @change-filter="setFilters"> </coaches-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button mode="outline" @click="loadCoaches(true)">
            Refresh</base-button
          >
          <base-button link to="/register" v-if="!isCoaches && !isLoading"
            >Register as a Coaches</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-else-if="hasCoaches">
          <coaches-item
            v-for="coaches in filteredCoaches"
            :key="coaches.id"
            :id="coaches.id"
            :firstName="coaches.firstName"
            :lastName="coaches.lastName"
            :rate="coaches.hourlyRate"
            :areas="coaches.areas"
          ></coaches-item>
        </ul>
        <h3 v-else>No Coaches Found!</h3>
      </base-card>
    </section>
  </div>
</template>
<script>
import CoachesItem from '../../components/coaches/CoachesItem.vue';
import CoachesFilter from './CoachesFilter.vue';
export default {
  data() {
    return {
      isLoading: false,
      error: null,
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  components: { CoachesItem, CoachesFilter },

  computed: {
    isCoaches() {
      return this.$store.getters['coaches/isCoaches'];
    },
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((coach) => {
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    setFilters(updateFilters) {
      this.activeFilters = updateFilters;
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
    handelError() {
      this.error = null;
    },
  },
};
</script>
<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
