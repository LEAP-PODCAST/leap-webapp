
<template>
    <div class="flex flex-col justify-center text-center border">
        <h2>Good morning, {{user}}!</h2>
        <h2>Let's Schedule it!</h2>
        <div class="flex">
            <div class="flex flex-col border">
                <form action="" class="flex flex-col">
                    <select name="" id="">
                        <option v-for='(camera, i) in cameras' :key="i" value="">{{camera}}</option>
                    </select>
                    <select name="" id="">
                        <option v-for='(microphone, i) in microphones' :key="i"  value="">{{microphone}}</option>
                    </select>
                    <select name="" id="">
                        <option v-for='(speaker, i) in speakers' :key="i" value="">{{speaker}}</option>
                    </select>                                                
                </form>
                <button class='text-xs'>Need Help? Contact Support</button>
            </div>
            <div>
                <form action="" class="flex flex-col">
                    <input type="text" placeholder="Episode Name">
                    <select name="" id="">
                        <option disabled selected>Choose Podcast</option>
                        <option v-for='(podcast, i) in podcasts' :key="i" value="">{{podcast}}</option>
                    </select>
                    <input type="text" placeholder="Add guests, @username if leap users or simply add email">
                    <input type="text" placeholder="Add description">
                    <select name="" id="">
                        <option value="">Private</option>
                        <option value="">Public</option>
                    </select>
                    <select name="" id="">
                        <option value="">15 minutes before</option>
                        <option value="">30 minutes before</option>
                        <option value="">1 Hour before</option>
                    </select>
                    <button @click.prevent="$emit('create-room')">Start Now</button>
                </form>
            </div>
        </div>
  </div>
</template>

<script>

export default {
    data(){
        return{
            //enumerate devices
            //gotten locally
            user: "Brene",
            cameras: ["FaceTime HD Camera (Built-in)", "Logitech 4K Camera"],
            microphones: ["Default - MacBook Pro Microphone (Built-in)", "Bose XD Microphone"],
            speakers: ["Default - MacBook Pro Speakers (Built-in)", "Beats Beta Headphones"],
            podcasts: ["The Jocko Podcast", "The Quest Podcast", "The Gabor Mate Podcast"]
        }
    }
}
</script>

<style lang="scss">

</style>
