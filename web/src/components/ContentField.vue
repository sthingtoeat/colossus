<template>
    <div class="container content-field">
        <div class="card">
            <div class="card-body">
                <slot></slot><!--这个标签是未来需要填充元素用的-->
            </div>
        </div>
    </div>
</template>

<script>

</script>
<!--下面的这个样式，表示的是与最顶上的导航栏直接的距离-->
<style scoped>
div.content-field{
    margin-top :20px;
}
</style>
