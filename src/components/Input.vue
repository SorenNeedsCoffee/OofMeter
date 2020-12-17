<template>
  <label>
    How many teachers do you need? <input type="number" v-model="a" placeholder="Teachers out" />
    <br/>
    How many in-house substitutes are available? 
    <input type="number" v-model="b" placeholder="In-house Subs (total)" />
    <br/>
    How many outside substitutes are available? 
    <input type="number" v-model="c" placeholder="Available outside subs" />
    <br/>
    How many monitors are available?
    <input type="number" v-model="f" placeholder="Classroom monitors" />
    <br/>
    How many IA/EA are available?
    <input type="number" v-model="d" placeholder="IA/EA" />
    <br/>
    How many willing teachers are available?
    <input
      type="number"
      v-model="e"
      placeholder="Teachers willing to give up planning"
    />
    <br/>
  </label>
  <div style="display: flex;justify-content: center;">
    <button v-on:click="calc" style="display:block;font-size:72px;text-align:center;margin:50px;padding:30px;">Find out</button>
  </div>
  <div><span style="font-size:52px;">{{ display }}</span></div>
</template>

<script>
export default {
  name: "Input",
  data: function() {
    return {
      a: undefined,
      b: undefined,
      c: undefined,
      d: undefined,
      e: undefined,
      f: undefined,
      display: "Please enter data"
    };
  },
  methods: {
    calc: async function() {
      if (this.a && this.b && this.c && this.d && this.e && this.f) {
        this.display = "...";
        let test = this.canOpen(
          parseInt(this.a),
          parseInt(this.b),
          parseInt(this.c),
          parseInt(this.d),
          parseInt(this.e),
          parseInt(this.f)
        );
        let audio = new Audio(require("../assets/OOF.mp3"));
        audio.playbackRate = (test[0]*0.1);
        audio.play();
        this.display = `The current danger rating: ${test[0]}. ${test[1]}`;
      }
    },
    canOpen: function(
      teachersOut,
      inSubstitutes,
      outSubstitutes,
      educationalAssistants,
      willingTeachers,
      monitors = 0
    ) {
      //Complain about bad inputs
      if (!Number.isInteger(teachersOut)) {
        throw "Teachers is not an integer, that doesn't sound right";
      }
      if (!Number.isInteger(inSubstitutes)) {
        throw "In house substitutes is not an integer, that doesn't sound right";
      }
      if (!Number.isInteger(outSubstitutes)) {
        throw "outside substitutes is not an integer, that doesn't sound right";
      }
      if (!Number.isInteger(educationalAssistants)) {
        throw "The number of EA's is not an integer, that doesn't sound right";
      }
      if (!Number.isInteger(willingTeachers)) {
        throw "Willing teachers is not an integer, that doesn't sound right";
      }
      if (!Number.isInteger(monitors)) {
        throw "The number of monitors is not an integer, that doesn't sound right";
      }
      if (teachersOut < 0) {
        throw "There are a negative numbers of teachers out, that doesn't sound right";
      }
      if (inSubstitutes < 0) {
        throw "There are a negative numbers of inside-subs, that doesn't sound right";
      }
      if (outSubstitutes < 0) {
        throw "There are a negative numbers of outSubstitutes, that doesn't sound right";
      }
      if (educationalAssistants < 0) {
        throw "There are a negative numbers of educational assistants, that doesn't sound right";
      }
      if (monitors < -1) {
        throw "There are a negative numbers of monitors, that doesn't sound right";
      }
      if (willingTeachers < -1) {
        throw "There are a negative numbers of willing teachers, that doesn't sound right";
      }
      //Proper Logic

      //Do we need to add more people?
      if (teachersOut === 0) {
        return [0, "There are no teachers out. School runs as normal"];
      }

      //Can we make it with substitutues
      if (teachersOut <= inSubstitutes) {
        return [
          teachersOut / inSubstitutes,
          teachersOut + " substitutes can make up the deficit"
        ];
      }

      //Can we make it with outside subs
      if (teachersOut <= inSubstitutes + outSubstitutes) {
        return [
          1 + (teachersOut - inSubstitutes) / outSubstitutes,
          "You can stay open with all in-house subs and " +
            (teachersOut - inSubstitutes) +
            " outside sub"
        ];
      }

      //Can we make it with the monitor system
      if (teachersOut <= inSubstitutes + outSubstitutes + monitors) {
        return [
          2 + (teachersOut - inSubstitutes - outSubstitutes) / monitors,
          "You can stay open with all in-house and out-house subs and " +
            (teachersOut - inSubstitutes - outSubstitutes) +
            " moniters"
        ];
      }

      //Can we make it with EA's
      if (
        teachersOut <=
        inSubstitutes + outSubstitutes + monitors + educationalAssistants
      ) {
        return [
          3 +
            (teachersOut - inSubstitutes - outSubstitutes - monitors) /
              educationalAssistants,
          "You are low on educational resources. It requires all inside/outside subs, monitors and " +
            (teachersOut - inSubstitutes - outSubstitutes - monitors) +
            " IA/EA to stay open"
        ];
      }

      //Can we make it with willing teacheres
      if (
        teachersOut <=
        inSubstitutes +
          outSubstitutes +
          monitors +
          educationalAssistants +
          willingTeachers
      ) {
        return [
          4 +
            (teachersOut -
              inSubstitutes -
              outSubstitutes -
              monitors -
              educationalAssistants) /
              willingTeachers,
          "You are running extremely low on educators. You must have all inside/outside substitutes, monitors, IE/EA and " +
            (teachersOut -
              inSubstitutes -
              outSubstitutes -
              monitors -
              educationalAssistants) +
            " willing teachers"
        ];
      }

      //Nope, we can't open
      return [
        6,
        "You cannot open. You need " +
          (teachersOut -
            inSubstitutes -
            outSubstitutes -
            monitors -
            educationalAssistants -
            willingTeachers) +
          " more people to open"
      ];
    }
  }
};
</script>

<style scoped></style>
