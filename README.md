## animation
a simple animation library implemented by javascript

### 1. usage
- #### 1. basic
```
// fromTo
fly.animation({
  action: fly.action.fromTo(
    el, {width: 0},{width: 100}
  )
})

// to
fly.animation({
  action: fly.action.to(
    el, {width: 100}
  )
})
```

- #### 2. duration (default: 2000)

```
fly.animation({
  duration: 5000,
  action: fly.action.to(
    el, {width: 100}
  )
})
```

- #### 3. reset (default: 1)
> reset 1 means the animation will not reset initial state finally.
> 
> reset 2 means the animation will reset initial state in the final.
> 
> reset 3 meas the animation will do a loop then reset 1.
> 
> reset Infinity means the animation will loop forever.
```
fly.animation({
  reset: 2,
  action: fly.action.to(
    el, {width: 100}
  )
})
```

- #### 4. strategy (default: "linear")
> default strategy is linear
>
> you can choose other strategy just type "fly.STRATEGY.[easeIn,easeOut...etc]" to choose
```
fly.animation({
  strategy: fly.STRATEGY.easeInCubic,
  action: fly.action.to(
    el, {width: 100}
  )
})
```

- #### 5. begin (default: noop)
> begin function use to callback the beginning
```
fly.animation({
  begin: () => {console.log("begin")},
  action: fly.action.to(
    el, {width: 100}
  )
})
```
- #### 6. end (default: noop)
> end function use to callback the ending
```
fly.animation(
  end: () => {console.log("ending")},
  action: fly.action.to(
    el, {width: 100}
  )
)
```

### 2. custom

- #### race
```
fly.animation(
  race: (progress, reset) => {
    // here you can define when stop animation
  },
  action: fly.action.to(
    el, {width: 100}
  )
)
```

- #### action

```
fly.animation(
  action: (_progress) => {
    // you operate dom in here, _progress is progress dealt by strategy method
  }
)
```


