package com.example.area.ui

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v4.app.Fragment
import android.support.v7.widget.GridLayoutManager
import android.support.v7.widget.LinearLayoutManager
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.area.R
//import sun.security.krb5.internal.KDCOptions.with
import android.support.v7.widget.RecyclerView
import android.widget.*
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser
import com.example.area.ui.activity.HomeActivity
import com.github.kittinunf.fuel.core.Response
import com.github.kittinunf.fuel.httpGet
import com.github.kittinunf.fuel.httpPost
import com.github.kittinunf.fuel.httpPut
import com.squareup.picasso.Picasso
import io.oauth.OAuth
import org.json.JSONObject
import java.lang.StringBuilder
import java.util.*
import kotlin.collections.ArrayList

class IngredientsFragment: Fragment() {

    companion object {
        lateinit var providers: JsonObject
        lateinit var uid: String
        lateinit var recyclerView: RecyclerView
        private var services: List<MyObject> = ArrayList()

        fun newInstance(): IngredientsFragment {
            return IngredientsFragment()
        }

        private fun setServices(callback: () -> Unit) {
            "https://areaserver.herokuapp.com/user/getProviders/$uid".httpGet().responseString { request, response, result ->
                //do something with response
                print("SENDED");
                result.fold({ d ->
                    val parser = Parser()
                    val stringBuilder = StringBuilder(d)
                    providers = parser.parse(stringBuilder) as JsonObject
                    println("providers: " + providers.boolean("weather"))
                    println("providers: " + providers.map)

                    if (services.isEmpty()) {
                        services = services + MyObject("GMail", R.drawable.logo_gmail, providers.boolean("google") as Boolean)
                        services = services + MyObject("Github", R.drawable.logo_github, providers.boolean("github") as Boolean)
                        services = services + MyObject("Trello", R.drawable.logo_trello, providers.boolean("trello") as Boolean)
                        services = services + MyObject("Twitter", R.drawable.logo_twitter, providers.boolean("twitter") as Boolean)
                        services = services + MyObject("Youtube", R.drawable.logo_youtube, providers.boolean("youtube") as Boolean)
                        services = services + MyObject("Weather", R.drawable.logo_weather, providers.boolean("weather") as Boolean)
                        services = services + MyObject("Timer", R.drawable.logo_timer, providers.boolean("timer") as Boolean)
                        services = services + MyObject("LinkedIn", R.drawable.logo_linkedin, providers.boolean("linkedin") as Boolean)
                        println("Services: $services")

                    }
                    callback()
                }, { err ->
                    //do something with error
                    println("receiveed ERRRROO00000000000OR: " + err);
                    callback()
                })
            }
        }

        private fun loginServiceGoogle(context: Context?) {
            var oauth = OAuth(context)
            oauth.initialize("68_EKct8MEGwo7LWSApzFB8Pqf8");
            oauth.popup("google") { data ->
                if (data.status == "error")
                else {
                    // Do API calls with data
                    println("SUCESSSS")

                    val rootObject = JSONObject()
                    rootObject.put("access_token", data.token.toString())
                    "https://areaserver.herokuapp.com/login/google?userId=$uid".httpPut().header("Content-Type" to "application/json", "access_token" to data.token).body(rootObject.toString()).responseString { request, response, result ->
                        //do something with response
                        print("SENDED");
                        result.fold({ d ->
                            //do something with data
                            providers.set("google", true)
                            services[0].setChecked(true)
                            services[0].getCheckBox()?.setChecked(true)
                            println("RECEIVED SUCCES:" + d)
                            Toast.makeText(context, "Succesfully google connected", Toast.LENGTH_SHORT).show()
                        }, { err ->
                            //do something with error
                            println("receiveed ERRRROOOR: " + err);
                            Toast.makeText(context, "Invalid google connection", Toast.LENGTH_SHORT).show()

                        })

                    }
                }
            }
        }

        private fun logoutServiceGoogle(context: Context?) {
            providers.set("google", false)

            val rootObject = JSONObject()
            val rootObject2 = JSONObject()
            rootObject2.put("google", providers.map["google"])
            rootObject2.put("github", providers.map["github"])
            rootObject2.put("twitter", providers.map["twitter"])
            rootObject2.put("trello", providers.map["trello"])
            rootObject2.put("youtube", providers.map["youtube"])
            rootObject2.put("timer", providers.map["timer"])
            rootObject2.put("weather", providers.map["weather"])
            rootObject2.put("linkedin", providers.map["linkedin"])

            rootObject.put("Providers", rootObject2)
            println("root = $rootObject")
            "https://areaserver.herokuapp.com/user/setProviders/$uid".httpPut().header("Content-Type" to "application/json", "Providers" to providers.map).body(rootObject.toString().replace("\\", "").replace("\"{", "{").replace("}\"", "}")).responseString { request, response, result ->
                //do something with response
                print("SENDED");
                result.fold({ d ->
                    //do something with data

                    services[0].setChecked(false)
                    services[0].getCheckBox()?.setChecked(false)
                    println("RECEIVED SUCCES:" + d)
                }, { err ->
                    //do something with error
                    println("receiveed ERRRROOOR: " + err);

                })

            }
        }

        private fun loginServiceYoutube(context: Context?) {
            var oauth = OAuth(context)
            oauth.initialize("68_EKct8MEGwo7LWSApzFB8Pqf8");
            oauth.popup("youtube") { data ->
                if (data.status == "error")
                else {
                    // Do API calls with data
                    println("SUCESSSS")

                    val rootObject = JSONObject()
                    rootObject.put("access_token", data.token.toString())
                    "https://areaserver.herokuapp.com/login/youtube?userId=$uid".httpPut().header("Content-Type" to "application/json", "access_token" to data.token).body(rootObject.toString()).responseString { request, response, result ->
                        //do something with response
                        print("SENDED");
                        result.fold({ d ->
                            //do something with data
                            providers.set("youtube", true)
                            services[4].setChecked(true)
                            services[4].getCheckBox()?.setChecked(true)
                            println("RECEIVED SUCCES:" + d)
                            Toast.makeText(context, "Succesfully youtube connected", Toast.LENGTH_SHORT).show()
                        }, { err ->
                            //do something with error
                            println("receiveed ERRRROOOR: " + err);
                            Toast.makeText(context, "Invalid youtube connection", Toast.LENGTH_SHORT).show()

                        })

                    }
                }
            }
        }

        private fun logoutServiceYoutube(context: Context?) {
            providers.set("youtube", false)

            val rootObject = JSONObject()
            val rootObject2 = JSONObject()
            rootObject2.put("google", providers.map["google"])
            rootObject2.put("github", providers.map["github"])
            rootObject2.put("twitter", providers.map["twitter"])
            rootObject2.put("trello", providers.map["trello"])
            rootObject2.put("youtube", providers.map["youtube"])
            rootObject2.put("timer", providers.map["timer"])
            rootObject2.put("weather", providers.map["weather"])
            rootObject2.put("linkedin", providers.map["linkedin"])

            rootObject.put("Providers", rootObject2)
            println("root = $rootObject")
            "https://areaserver.herokuapp.com/user/setProviders/$uid".httpPut().header("Content-Type" to "application/json", "Providers" to providers.map).body(rootObject.toString().replace("\\", "").replace("\"{", "{").replace("}\"", "}")).responseString { request, response, result ->
                //do something with response
                print("SENDED");
                result.fold({ d ->
                    //do something with data

                    services[4].setChecked(false)
                    services[4].getCheckBox()?.setChecked(false)
                    println("RECEIVED SUCCES:" + d)
                }, { err ->
                    //do something with error
                    println("receiveed ERRRROOOR: " + err);

                })

            }
        }


        private fun loginServiceGithub(context: Context?) {
            var oauth = OAuth(context)
            oauth.initialize("68_EKct8MEGwo7LWSApzFB8Pqf8");
            oauth.popup("github") { data ->
                if (data.status == "error")
                else {
                    // Do API calls with data
                    println("SUCESSSS")

                    val rootObject = JSONObject()
                    rootObject.put("access_token", data.token.toString())
                    "https://areaserver.herokuapp.com/login/github?userId=$uid".httpPut().header("Content-Type" to "application/json", "access_token" to data.token).body(rootObject.toString()).responseString { request, response, result ->
                        //do something with response
                        print("SENDED");
                        result.fold({ d ->
                            //do something with data
                            providers.set("github", true)
                            services[1].setChecked(true)
                            services[1].getCheckBox()?.setChecked(true)
                            println("swag $services")
                            println("RECEIVED SUCCES:" + d)
                            Toast.makeText(context, "Succesfully github connected", Toast.LENGTH_SHORT).show()
                        }, { err ->
                            //do something with error
                            println("receiveed ERRRROOOR: " + err);
                            Toast.makeText(context, "Invalid github connection", Toast.LENGTH_SHORT).show()

                        })

                    }
                }
            }
        }

        private fun logoutServiceGithub(context: Context?) {
            providers.set("github", false)

            val rootObject = JSONObject()
            val rootObject2 = JSONObject()
            rootObject2.put("google", providers.map["google"])
            rootObject2.put("github", providers.map["github"])
            rootObject2.put("twitter", providers.map["twitter"])
            rootObject2.put("trello", providers.map["trello"])
            rootObject2.put("youtube", providers.map["youtube"])
            rootObject2.put("timer", providers.map["timer"])
            rootObject2.put("weather", providers.map["weather"])
            rootObject2.put("linkedin", providers.map["linkedin"])

            rootObject.put("Providers", rootObject2)

            println("root = $rootObject")
            "https://areaserver.herokuapp.com/user/setProviders/$uid".httpPut().header("Content-Type" to "application/json", "Providers" to providers.map).body(rootObject.toString().replace("\\", "").replace("\"{", "{").replace("}\"", "}")).responseString { request, response, result ->
                //do something with response
                print("SENDED");
                result.fold({ d ->
                    //do something with data

                    services[1].setChecked(false)
                    services[1].getCheckBox()?.setChecked(false)
                    println("RECEIVED SUCCES:" + d)
                }, { err ->
                    //do something with error
                    println("receiveed ERRRROOOR: " + err);

                })

            }
        }


        private fun loginServiceTwitter(context: Context?) {
            var oauth = OAuth(context)
            oauth.initialize("68_EKct8MEGwo7LWSApzFB8Pqf8");
            oauth.popup("twitter") { data ->
                if (data.status == "error")
                else {
                    // Do API calls with data
                    println("SUCESSSS")

                    val rootObject = JSONObject()
                    rootObject.put("oauth_token", data.token.toString())
                    rootObject.put("oauth_token_secret", data.token.toString())
                    "https://areaserver.herokuapp.com/login/twitter?userId=$uid".httpPut().header("Content-Type" to "application/json", "oauth_token" to data.token, "oauth_token_secret" to data.token).body(rootObject.toString()).responseString { request, response, result ->
                        //do something with response
                        print("SENDED");
                        result.fold({ d ->
                            //do something with data
                            providers.set("twitter", true)
                            services[3].setChecked(true)
                            services[3].getCheckBox()?.setChecked(true)
                            println("RECEIVED SUCCES:" + d)
                            Toast.makeText(context, "Succesfully twitter connected", Toast.LENGTH_SHORT).show()
                        }, { err ->
                            //do something with error
                            println("receiveed ERRRROOOR: " + err);
                            Toast.makeText(context, "Invalid twitter connection", Toast.LENGTH_SHORT).show()

                        })

                    }
                }
            }

        }

        private fun logoutServiceTwitter(context: Context?) {
            providers.set("twitter", false)

            val rootObject = JSONObject()
            val rootObject2 = JSONObject()
            rootObject2.put("google", providers.map["google"])
            rootObject2.put("github", providers.map["github"])
            rootObject2.put("twitter", providers.map["twitter"])
            rootObject2.put("trello", providers.map["trello"])
            rootObject2.put("youtube", providers.map["youtube"])
            rootObject2.put("timer", providers.map["timer"])
            rootObject2.put("weather", providers.map["weather"])
            rootObject2.put("linkedin", providers.map["linkedin"])

            rootObject.put("Providers", rootObject2)
            println("root = $rootObject")
            "https://areaserver.herokuapp.com/user/setProviders/$uid".httpPut().header("Content-Type" to "application/json", "Providers" to providers.map).body(rootObject.toString().replace("\\", "").replace("\"{", "{").replace("}\"", "}")).responseString { request, response, result ->
                //do something with response
                print("SENDED");
                result.fold({ d ->
                    //do something with data

                    services[3].setChecked(false)
                    services[3].getCheckBox()?.setChecked(false)
                    println("RECEIVED SUCCES:" + d)
                }, { err ->
                    //do something with error
                    println("receiveed ERRRROOOR: " + err);

                })

            }
        }

        private fun loginServiceWeather(context: Context?) {
            providers.set("weather", true)

            val rootObject = JSONObject()
            val rootObject2 = JSONObject()
            rootObject2.put("google", providers.map["google"])
            rootObject2.put("github", providers.map["github"])
            rootObject2.put("twitter", providers.map["twitter"])
            rootObject2.put("trello", providers.map["trello"])
            rootObject2.put("youtube", providers.map["youtube"])
            rootObject2.put("timer", providers.map["timer"])
            rootObject2.put("weather", providers.map["weather"])
            rootObject2.put("linkedin", providers.map["linkedin"])

            rootObject.put("Providers", rootObject2)
            println("root = $rootObject")
            "https://areaserver.herokuapp.com/user/setProviders/$uid".httpPut().header("Content-Type" to "application/json", "Providers" to providers.map).body(rootObject.toString().replace("\\", "").replace("\"{", "{").replace("}\"", "}")).responseString { request, response, result ->
                //do something with response
                print("SENDED");
                result.fold({ d ->
                    //do something with data

                    services[5].setChecked(true)
                    services[5].getCheckBox()?.setChecked(true)
                    println("RECEIVED SUCCES:" + d)
                }, { err ->
                    //do something with error
                    println("receiveed ERRRROOOR: " + err);

                })

            }
        }

        private fun logoutServiceWeather(context: Context?) {
            providers.set("weather", false)

            val rootObject = JSONObject()
            val rootObject2 = JSONObject()
            rootObject2.put("google", providers.map["google"])
            rootObject2.put("github", providers.map["github"])
            rootObject2.put("twitter", providers.map["twitter"])
            rootObject2.put("trello", providers.map["trello"])
            rootObject2.put("youtube", providers.map["youtube"])
            rootObject2.put("timer", providers.map["timer"])
            rootObject2.put("weather", providers.map["weather"])
            rootObject2.put("linkedin", providers.map["linkedin"])

            rootObject.put("Providers", rootObject2)
            println("root = $rootObject")
            "https://areaserver.herokuapp.com/user/setProviders/$uid".httpPut().header("Content-Type" to "application/json", "Providers" to providers.map).body(rootObject.toString().replace("\\", "").replace("\"{", "{").replace("}\"", "}")).responseString { request, response, result ->
                //do something with response
                print("SENDED");
                result.fold({ d ->
                    //do something with data

                    services[5].setChecked(false)
                    services[5].getCheckBox()?.setChecked(false)
                    println("RECEIVED SUCCES:" + d)
                }, { err ->
                    //do something with error
                    println("receiveed ERRRROOOR: " + err);

                })

            }
        }

        private fun loginServiceTimer(context: Context?) {
            providers.set("timer", true)

            val rootObject = JSONObject()
            val rootObject2 = JSONObject()
            rootObject2.put("google", providers.map["google"])
            rootObject2.put("github", providers.map["github"])
            rootObject2.put("twitter", providers.map["twitter"])
            rootObject2.put("trello", providers.map["trello"])
            rootObject2.put("youtube", providers.map["youtube"])
            rootObject2.put("timer", providers.map["timer"])
            rootObject2.put("weather", providers.map["weather"])
            rootObject2.put("linkedin", providers.map["linkedin"])

            rootObject.put("Providers", rootObject2)
            println("root = $rootObject")
            "https://areaserver.herokuapp.com/user/setProviders/$uid".httpPut().header("Content-Type" to "application/json", "Providers" to providers.map).body(rootObject.toString().replace("\\", "").replace("\"{", "{").replace("}\"", "}")).responseString { request, response, result ->
                //do something with response
                print("SENDED");
                result.fold({ d ->
                    //do something with data

                    services[6].setChecked(true)
                    services[6].getCheckBox()?.setChecked(true)
                    println("RECEIVED SUCCES:" + d)
                }, { err ->
                    //do something with error
                    println("receiveed ERRRROOOR: " + err);

                })

            }
        }

        private fun logoutServiceTimer(context: Context?) {
            providers.set("timer", false)

            val rootObject = JSONObject()
            val rootObject2 = JSONObject()
            rootObject2.put("google", providers.map["google"])
            rootObject2.put("github", providers.map["github"])
            rootObject2.put("twitter", providers.map["twitter"])
            rootObject2.put("trello", providers.map["trello"])
            rootObject2.put("youtube", providers.map["youtube"])
            rootObject2.put("timer", providers.map["timer"])
            rootObject2.put("weather", providers.map["weather"])
            rootObject2.put("linkedin", providers.map["linkedin"])

            rootObject.put("Providers", rootObject2)
            println("root = $rootObject")
            "https://areaserver.herokuapp.com/user/setProviders/$uid".httpPut().header("Content-Type" to "application/json", "Providers" to providers.map).body(rootObject.toString().replace("\\", "").replace("\"{", "{").replace("}\"", "}")).responseString { request, response, result ->
                //do something with response
                print("SENDED");
                result.fold({ d ->
                    //do something with data

                    services[6].setChecked(false)
                    services[6].getCheckBox()?.setChecked(false)
                    println("RECEIVED SUCCES:" + d)
                }, { err ->
                    //do something with error
                    println("receiveed ERRRROOOR: " + err);

                })

            }
        }

        private fun loginServiceLinkedin(context: Context?) {
            var oauth = OAuth(context)
            oauth.initialize("68_EKct8MEGwo7LWSApzFB8Pqf8");
            oauth.popup("linkedin2") { data ->
                if (data.status == "error")
                else {
                    // Do API calls with data
                    println("SUCESSSS")

                    val rootObject = JSONObject()
                    rootObject.put("token", data.token.toString())
                    "https://areaserver.herokuapp.com/login/linkedin?userId=$uid".httpPut().header("Content-Type" to "application/json", "token" to data.token).body(rootObject.toString()).responseString { request, response, result ->
                        //do something with response
                        print("SENDED");
                        result.fold({ d ->
                            //do something with data
                            providers.set("linkedin", true)
                            services[7].setChecked(true)
                            services[7].getCheckBox()?.setChecked(true)
                            println("RECEIVED SUCCES:" + d)
                            Toast.makeText(context, "Succesfully linkedin connected", Toast.LENGTH_SHORT).show()
                        }, { err ->
                            //do something with error
                            println("receiveed ERRRROOOR: " + err);
                            Toast.makeText(context, "Invalid linkedin connection", Toast.LENGTH_SHORT).show()

                        })

                    }
                }
            }
        }

        private fun logoutServiceLinkedin(context: Context?) {
            providers.set("linkedin", false)

            val rootObject = JSONObject()
            val rootObject2 = JSONObject()
            rootObject2.put("google", providers.map["google"])
            rootObject2.put("github", providers.map["github"])
            rootObject2.put("twitter", providers.map["twitter"])
            rootObject2.put("trello", providers.map["trello"])
            rootObject2.put("youtube", providers.map["youtube"])
            rootObject2.put("timer", providers.map["timer"])
            rootObject2.put("weather", providers.map["weather"])
            rootObject2.put("linkedin", providers.map["linkedin"])

            rootObject.put("Providers", rootObject2)
            println("root = $rootObject")
            "https://areaserver.herokuapp.com/user/setProviders/$uid".httpPut().header("Content-Type" to "application/json", "Providers" to providers.map).body(rootObject.toString().replace("\\", "").replace("\"{", "{").replace("}\"", "}")).responseString { request, response, result ->
                //do something with response
                print("SENDED");
                result.fold({ d ->
                    //do something with data

                    services[7].setChecked(false)
                    services[7].getCheckBox()?.setChecked(false)
                    println("RECEIVED SUCCES:" + d)
                }, { err ->
                    //do something with error
                    println("receiveed ERRRROOOR: " + err);

                })

            }
        }

    }


    override fun onAttach(context: Context?) {
        super.onAttach(context)

        val prefs = context?.getSharedPreferences("area_user", Context.MODE_PRIVATE)
        uid = prefs!!.getString("uid", "")
        uid = uid.replace("\"", "")
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        println("Ingredients")
        val view: View = inflater!!.inflate(R.layout.fragment_ingredients, container,
                false)
        val activity = activity
        recyclerView = view.findViewById(R.id.recyclerView) as RecyclerView
        recyclerView.layoutManager = GridLayoutManager(activity, 2)
        setServices { recyclerView.adapter = MyAdapter(services) }
        println("Services: $services")
        return view
    }

    class MyObject(text: String, imageUrl: Int, checked: Boolean) {
        private val _text: String = text
        private val _img: Int = imageUrl
        private val _checked: Boolean = checked
        private val _checkBox: CheckBox? = null

        fun getText(): String {
            return _text
        }

        fun getImage(): Int {
            return _img
        }

        fun setChecked(c: Boolean) {
            _checked == c
        }

        fun getChecked(): Boolean {
            return _checked
        }

        fun setCheckBox(c: CheckBox) {
            _checkBox == c
        }

        fun getCheckBox(): CheckBox? {
            return _checkBox
        }
    }


    class MyAdapter(internal val list: List<MyObject>) : RecyclerView.Adapter<MyViewHolder>() {

        //cette fonction permet de créer les viewHolder
        //et par la même indiquer la vue à inflater (à partir des layout xml)
        override fun onCreateViewHolder(viewGroup: ViewGroup, itemType: Int): MyViewHolder {
            val view = LayoutInflater.from(viewGroup.context).inflate(R.layout.ingredients, viewGroup, false)
            return MyViewHolder(view)
        }

        //c'est ici que nous allons remplir notre cellule avec le texte/image de chaque MyObjects
        override fun onBindViewHolder(myViewHolder: MyViewHolder, position: Int) {
            val myObject = list[position]
            myViewHolder.bind(myObject)
        }

        override fun getItemCount(): Int {
            return list.size
        }

    }

    class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

        private val textViewView: TextView
        private val imageView: ImageView
        private val buttonView: Button
        private val buttonOutView: Button
        private val checkedView: CheckBox

        init {

            //c'est ici que l'on fait nos findView

            textViewView = itemView.findViewById(R.id.textService) as TextView
            imageView = itemView.findViewById(R.id.imageService) as ImageView
            buttonView = itemView.findViewById(R.id.buttonLogService) as Button
            buttonOutView = itemView.findViewById(R.id.buttonLogOutService) as Button
            checkedView = itemView.findViewById(R.id.checkBoxService) as CheckBox
        }

        //puis ajouter une fonction pour remplir la cellule en fonction d'un MyObject
        fun bind(myObject: MyObject) {
            textViewView.setText(myObject.getText())
            Picasso.with(imageView.context).load(myObject.getImage()).centerCrop().fit().into(imageView)
            when (myObject.getText()) {
                "GMail" -> {checkedView.setChecked(myObject.getChecked()) ; myObject.setCheckBox(checkedView)}
                "Github" -> {checkedView.setChecked(myObject.getChecked()) ; myObject.setCheckBox(checkedView)}
                "Trello" -> {checkedView.setChecked(myObject.getChecked()) ; myObject.setCheckBox(checkedView)}
                "Twitter" -> {checkedView.setChecked(myObject.getChecked()) ; myObject.setCheckBox(checkedView)}
                "Youtube" -> {checkedView.setChecked(myObject.getChecked()) ; myObject.setCheckBox(checkedView)}
                "Weather" -> {checkedView.setChecked(myObject.getChecked()) ; myObject.setCheckBox(checkedView)}
                "Timer" -> {checkedView.setChecked(myObject.getChecked()) ; myObject.setCheckBox(checkedView)}
                "LinkedIn" -> {checkedView.setChecked(myObject.getChecked()) ; myObject.setCheckBox(checkedView)}
            }
            buttonView.setOnClickListener {
                when (myObject.getText()) {
                "GMail" -> loginServiceGoogle(itemView.context)
                "Github" -> loginServiceGithub(itemView.context)
                "Trello" -> null
                "Twitter" -> loginServiceTwitter(itemView.context)
                "Youtube" -> loginServiceYoutube(itemView.context)
                "Weather" -> loginServiceWeather(itemView.context)
                "Timer" -> loginServiceTimer(itemView.context)
                "LinkedIn" -> loginServiceLinkedin(itemView.context)
            }
            }
            buttonOutView.setOnClickListener {
                when (myObject.getText()) {
                    "GMail" -> logoutServiceGoogle(itemView.context)
                    "Github" -> logoutServiceGithub(itemView.context)
                    "Trello" -> null
                    "Twitter" -> logoutServiceTwitter(itemView.context)
                    "Youtube" -> logoutServiceYoutube(itemView.context)
                    "Weather" -> logoutServiceWeather(itemView.context)
                    "Timer" -> logoutServiceTimer(itemView.context)
                    "LinkedIn" -> logoutServiceLinkedin(itemView.context)
                }
            }
        }
    }}


