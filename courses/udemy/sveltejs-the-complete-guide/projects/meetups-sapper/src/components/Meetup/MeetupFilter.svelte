<script>
  export let segment
</script>

<style type="text/stylus">
  div
    display flex
    justify-contents flex-end

  a
    background #aaaaaa
    font inherit
    font-size 1rem
    cursor pointer
    border 1px solid #aaaaaa
    padding 0.5rem 1rem
    text-decoration none

    &:focus
      outline none

    &:first-of-type
      border-radius 5px 0 0 5px

    &:last-of-type
      border-radius 0 5px 5px 0

    &:hover,
    &:active,
    &.active
      background #cf0056
      border-color #cf0056
      color white
</style>

<div>
  <a
    rel="prefetch"
    href="/"
    class:active={segment === undefined}>
    All
  </a>
  <a
    rel="prefetch"
    href="/favorites"
    class:active={segment === 'favorites'}>
    Favorites
  </a>
</div>
