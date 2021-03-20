
<template>
    <div class="flex flex-col justify-center text-center border">
        <h2>Good morning, Brene!</h2>
        <h2>Let's Schedule it!</h2>
        <div class="flex">
            <div class="flex flex-col border">
                <form action="" class="flex flex-col">
                    <select name="" id="">
                        <option value="">FaceTime HD Camera (Built-in)</option>
                    </select>
                    <select name="" id="">
                        <option value="">Default - MacBook Pro Microphone (Built-in)</option>
                    </select>
                    <select name="" id="">
                        <option value="">Default - MacBook Pro Speakers (Built-in)</option>
                    </select>                                                
                </form>
            </div>
            <div>
                <form action="" class="flex flex-col">
                    <input type="text" placeholder="Episode Name">
                    <select name="" id="">
                        <option disabled selected>Choose Podcast</option>
                        <option>The Quest Podcast</option>
                        <option>Jocko Podcast</option>
                        <option>The Gabor Mate Podcast</option>
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

}
</script>

<style lang="scss">

</style>
