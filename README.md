<h1 align="center">Action REAction</h1>
<p align="center">
  <img src="AreaLogo.png" alt="AREA: Action REAction API" width="250">
  <br>
</p>

[![Known Vulnerabilities](https://snyk.io/test/github/dwyl/hapi-auth-jwt2/badge.svg?targetFile=package.json)](https://snyk.io/test/github/dwyl/hapi-auth-jwt2?targetFile=package.json)
[![npm version](https://badge.fury.io/js/react.svg)](https://badge.fury.io/js/react)
[![JavaScript Style Guide: Good Parts](https://img.shields.io/badge/code%20style-goodparts-brightgreen.svg?style=flat)](https://github.com/dwyl/goodparts "JavaScript The Good Parts")
[![Total Downloads](https://poser.pugx.org/firebase/php-jwt/downloads)](https://packagist.org/packages/firebase/php-jwt)
[![Latest Stable Version](https://poser.pugx.org/firebase/php-jwt/v/stable)](https://packagist.org/packages/firebase/php-jwt)
[![Docker Build Status](https://img.shields.io/docker/build/redocly/redoc.svg)](https://hub.docker.com/r/redocly/redoc/)
[![dependencies Status](https://david-dm.org/Rebilly/ReDoc/status.svg)](https://david-dm.org/Rebilly/ReDoc)
[![devDependencies Status](https://david-dm.org/Rebilly/ReDoc/dev-status.svg)](https://david-dm.org/Rebilly/ReDoc#info=devDependencies)
[![License](https://img.shields.io/npm/l/redoc.svg)](https://github.com/Rebilly/ReDoc/blob/master/LICENSE)



## Summary

- [AREA API](#sommary)
	- [Resume](#resume)
	- [Information](#information)
	- [URL](#url)
	- [Docker](#docker)
	- [Authentification](#authentification)
	- [AREA](#area)
	- [USER](#user)
	- [Changes](#changes)
	- [FAQ](#faq)
	- [License](#license)


## Resume

Welcome to the Area Markdownd

The project is a the software platform in [node.js](https://nodejs.org/en/). The project follow the creation of a [IFTTT](https://ifttt.com/) or [Zapier](https://zapier.com/) project,it provides workflows to automate the use of web applications together. It is often described as a translator between web APIs.

## Information

This software suite id broke into three parts:
- An application server to implement all the features ([Nodejs](https://nodejs.org/en/))
- A web client to use the application from your browser by querying theapplication server ([Reactjs](https://reactjs.org/))
- A mobile client to use the application from your phone by querying theapplication server ([Kotlin](https://kotlinlang.org/))

We a running all app with [Docker](https://www.docker.com/).

#### API Used

- **[Youtube](https://developers.google.com/youtube/v3/)**
- **[Google](https://console.cloud.google.com/apis/)**
- **[Trello](https://developers.trello.com/)**
- **[Github](https://developer.github.com/v3/)**
- **[Twitter](https://developer.twitter.com/en/docs.html)**
- **[LinkdIn](https://developer.linkedin.com/docs/rest-api)**

## URL

<https://areaserver.herokuapp.com/>

## Docker

Run the project with:

<code>$ docker-compose build && docker-compose up </code>

## Authentification

- **<code>POST</code> /login**
- **<code>POST</code> /login/github**
- **<code>POST</code> /login/google**
- **<code>POST</code> /login/trello**
- **<code>POST</code> /login/twitter**
- **<code>POST</code> /login/linkdIn**

### Exemple:

```js
axios.post(`https://areaserver.herokuapp.com/login`,
{ email: this.state.email, password: this.state.password}, 
{ headers: {'Content-Type':'application/json'} } )
        .then(res => {
                console.log(res.data._id);
        }).catch(err => {
                console.log(err);
        });
```

## AREA

- **<code>POST</code> /area/create**
- **<code>GET</code>  /area/**
- **<code>GET</code>  /area/:id**
- **<code>UP</code> /area/:id**
- **<code>DEL</code> /area/:id**
- **<code>GET</code> /area/action/available**
- **<code>GET</code> /area/reaction/available**

### Exemple:

```js
axios.post(`https://areaserver.herokuapp.com/area/create/`, {userId: localStorage.getItem("user"), action: this.state.actionData, reaction: this.state.reactionData}, {headers: {'Content-Type':'application/json'}})
	.then(res => {
		if (res.status === 200) {
			alert("area successfully created");
			this.props.history.push("/home")
                }
                console.log(res);
        }).catch((error) => {
		alert("creation of the area failed");
	});
```

## USER

- **<code>POST</code> /user/create**
- **<code>GET</code> /user/**
- **<code>GET</code> /user/current**
- **<code>GET</code> /user/:id**
- **<code>PUT</code> /area/:id**
- **<code>DEL</code> /area/:id**
- **<code>GET</code> /area/getProviders/:id**
- **<code>PUT</code> /area/getProviders/:id**

### Exemple:

```js
        axios.put(url, {username: this.state.username, email: this.state.email, password: this.state.password},
	{headers: {'Content-Type':'application/json'}})
	.then((response) => {
		console.log(response);
		this.refs.toast.show("Succesfuly connected", 1000);
	})
	.catch((error) => {
	        console.log(error);
	});
```

## Changes

* 2019-02-05 Deprecated the old upload flow with `upload_key` and [replaced with new one](https://github.com/500px/api-documentation/blob/master/basics/upload.md)
* 2019-02-04 Deprecated photo object's image_url key.

## FAQ
### What do I need to know before I start using the API?
Got rust on your skills? No worries. Here are the docs you might need to get started:

- HTTPS protocol
- Authentication with [OAuth](https://oauth.io/) (or the official [Beginner’s Guide](https://hueniverse.com/oauth-f8412c3fb6d7))
- Data serialization with [JSON](http://json.org/) (or see a [quick tutorial](https://www.wired.com/2010/02/get_started_with_json/))

### How do I connect to the AREA API?
The API is only available to authenticated clients. Clients should authenticate users using <code>OAuth</code>. Once authenticated, you need to request a resource from one of the endpoints using HTTPS. Generally, reading any data is done through a request with <code>GET</code> method. If you want our server to create, update or delete a given resource, <code>POST</code> or <code>PUT</code> methods are required.

### What return formats do you support?
AREA API currently returns data in [JSON](http://json.org/ "JSON") format.

### What kind of authentication is required?
Applications must identify themselves to access any resource.
**Consumer_key** containing a valid Consumer Key parameter should be specified in the query string. Otherwise, [OAuth] or upload key authentication takes care of identifying the application as well as the user accessing the API.

## License

MIT License

(c) 2019 YOPEY YOPEY LLC by HIVE CITY GANG

