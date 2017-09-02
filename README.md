# bindx

Memorized `bind`. Let you bind context and arguments easier in JSX!

Before:
```javascript
    onClick={this.onClick.bind(this, item)}
```

Now:
```javascript
    onClick={bindx(this, this.onClick, item)}
```

Before:
```javascript
    onClick={this.onClick.bind(this, item)}
```

Now:
```javascript
    onClick={bindx(this, this.onClick, item)}
```
