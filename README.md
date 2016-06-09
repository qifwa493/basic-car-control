# Basic_car_control
This program is about how to set up a basic car control system with Raspberry Pi and node.js.

##How to use:

**Step 1:**

<a>Install Raspbian OS to Raspberry Pi.</a>


**Step 2:**

Install node.js and npm. Follow this instruction: http://joshondesign.com/2013/10/23/noderpi</p>


**Step 3:**

Install **rpio**:
```
$ npm install rpio
```
Install **socket.io**:
```
$ npm install socket.io
```


**Step 4:**

Run the server.js file in either **4motors** or **advControl** by using:
```
$ node server.js
```

**Step 5:**
Open your browser and go to
```
127.0.0.1:8080
```
Or if you know your device's IP address, you can access it from other device in the same local network
