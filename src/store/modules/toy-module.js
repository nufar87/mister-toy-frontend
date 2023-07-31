import { toyService } from '../../services/toy-service';

export default {
  state: {
    filterBy: {
      label: 'All',
      sort: 'name',
      inStock: true,
    },
    toys: null,
  },
  getters: {
    toys(state) {
      return state.toys;
    },
    testData(state) {
      return state.testData;
    },
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys;
    },
    setFilter(state, { filterBy }) {
      state.filterBy = filterBy;
    },
    removeToy(state, { _id }) {
      const idx = state.toys.findIndex((toy) => toy._id === _id);
      state.toys.splice(idx, 1);
    },
    saveToy(state, { toy }) {
      const idx = state.toys.findIndex((currToy) => currToy._id === toy._id);
      if (idx !== -1) state.toys.splice(idx, 1, toy);
      else state.toys.push(toy);
    },
  },
  actions: {
    loadToys({ commit, state }) {
      toyService.query(state.filterBy).then((toys) => {
        commit({ type: 'setToys', toys });
      });
    },
    async getToyById(context, { toyId }) {
      try {
        return await toyService.getById(toyId);
      } catch (err) {
        console.log('toyModule cannot getToyById', err);
      }
    },
    setFilter({ commit, dispatch }, { filterBy }) {
      commit({ type: 'setFilter', filterBy });
      dispatch({ type: 'loadToys' });
    },
    removeToy({ commit }, { _id }) {
      toyService.remove(_id).then(() => {
        commit({ type: 'removeToy', _id });
      });
    },
    saveToy({ commit }, { toy }) {
      toyService.save(toy).then((toy) => {
        commit({ type: 'saveToy', toy });
      });
    },
  },
};

// import { toyService } from '@/services/toy-service.js';
// import { socketService } from '../../services/socket-service';

// export default {
//   state: {
//     toys: null,
//     filterBy: null,
//   },
//   getters: {
//     getToys(state) {
//       return state.toys;
//     },
//   },
//   mutations: {
//     setToys(state, { toys }) {
//       state.toys = toys;
//     },

//     setFilterBy(state, { filterBy }) {
//       state.filterBy = filterBy;
//     },

//     sortBy(state, { sortBy }) {
//       var toys = JSON.parse(JSON.stringify(state.toys));
//       if (!sortBy) state.toys = toys;
//       else
//         state.toys = toys.sort((a, b) => {
//           let valA = a[sortBy];
//           let valB = b[sortBy];
//           if (sortBy === 'name') {
//             valA = valA.toLowerCase();
//             valB = valB.toLowerCase();
//           }
//           return valA > valB ? 1 : -1;
//         });
//     },

//     removeToy(state, { toyId }) {
//       var toys = JSON.parse(JSON.stringify(state.toys));
//       var toyIdx = toys.findIndex((toy) => toy._id === toyId);
//       toys.splice(toyIdx, 1);
//       state.toys = toys;
//     },

//     addToy(state, { toy }) {
//       state.toys.push(toy);
//     },

//     updateToy(state, { toy }) {
//       const idx = state.toys.findIndex((currToy) => currToy._id === toy._id);
//       state.toys.splice(idx, 1, toy);
//     },
//   },
//   actions: {
//     async loadToys(context) {
//       try {
//         var filterBy = context.state.filterBy ? context.state.filterBy : '';
//         const toys = await toyService.getToys(filterBy);
//         context.commit({ type: 'setToys', toys: toys });
//         return toys;
//       } catch (err) {
//         console.log(err);
//       }
//     },

//     async getToyById(context, { toyId }) {
//       try {
//         return await toyService.getById(toyId);
//       } catch (err) {
//         console.log(err);
//       }
//     },

//     getEmptyToy() {
//       return toyService.getEmptyToy();
//     },

//     async removeToy(context, { toyId }) {
//       try {
//         await toyService.removeToy(toyId);
//         context.commit({ type: 'removeToy', toyId });
//         socketService.emit('delete toy', toyId);
//         return;
//       } catch (err) {
//         console.log(err);
//       }
//     },

//     async saveToy(context, { toy }) {
//       try {
//         const isEdit = toy._id;
//         const savedToy = await toyService.saveToy(toy);
//         context.commit({
//           type: isEdit ? 'updateToy' : 'addToy',
//           toy: savedToy,
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     },
//   },
//   modules: {},
// };
