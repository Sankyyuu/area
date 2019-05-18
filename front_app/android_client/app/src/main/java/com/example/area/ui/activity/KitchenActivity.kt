package com.example.area.ui.activity

import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.BaseAdapter
import android.widget.Button
import android.widget.ListView
import android.widget.TextView
import com.example.area.R
import com.github.kittinunf.fuel.httpDelete
import com.github.kittinunf.fuel.httpGet
import com.google.gson.Gson
import com.google.gson.GsonBuilder


class KitchenActivity : AppCompatActivity() {

    var user: String = ""
    var _gson: Gson? = null
    lateinit var areas: Array<areaModel>

    override fun onCreate(savedInstanceState: Bundle?){
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_kitchen)
        val prefs = this.getSharedPreferences("area_user", Context.MODE_PRIVATE)
        this.user = prefs!!.getString("uid", "uid")
        println("user= " + this.user);
        this._gson = GsonBuilder().create()
        this.getAreas2{
            val listArea = this.findViewById<ListView>(R.id.list_areas)
            listArea?.setBackgroundColor(Color.parseColor("#efeff5"))
            println("this.AREAS=" + this.areas)
            listArea?.adapter = MyCustomAdapter(this, this.areas)
        }
    }


    fun getAreas2(callback: () -> Unit) {
        val userid = this.user.replace("\"", "")
        val url ="https://areaserver.herokuapp.com/area?userId=${userid}"
        url.httpGet().responseString { request, response, result -> result.fold({ d ->
                println("data = "+d)
                this.areas = this._gson!!.fromJson(d, Array<areaModel>::class.java)
                //println(this.areas.get(1).action)

                callback()
        }, { err ->
            println("receiveed ERRRROOOR: " + err);
            callback()
        })
        }
    }

    fun areaCreation(view: View) {
        startActivity(Intent(this, actionActivity::class.java))
    }

    private class MyCustomAdapter(context: Context, areas: Array<areaModel>): BaseAdapter() {

        private val mContext: Context
        private val mAreas: Array<areaModel> = areas


        init {
            mContext = context
        }

        override fun getCount(): Int {
            return mAreas.size
        }

        override fun getItemId(position: Int): Long {
            return position.toLong()
        }

        override fun getItem(position: Int): Any {
            return "test"
        }

        override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
            val layoutInflater = LayoutInflater.from(this.mContext)

            val item = layoutInflater.inflate(R.layout.area_item_view, parent, false)
            var areaName = item.findViewById<TextView>(R.id.areaName);
            var actionName = item.findViewById<TextView>(R.id.actionName);
            var reactionName = item.findViewById<TextView>(R.id.reactionName);
            var buttonDelete = item.findViewById<Button>(R.id.deleteArea);
            var id = item.findViewById<TextView>(R.id.idStock);

            areaName.text = this.mAreas?.get(position)?.name
            actionName.text = this.mAreas?.get(position)?.action?.name
            reactionName.text = this.mAreas?.get(position)?.reaction?.name
            id.text = this.mAreas?.get(position)?._id

            buttonDelete.setOnClickListener( object : View.OnClickListener {
                override fun onClick(v: View) {
                        println("LOLOLDELETING "+ id.text )
                    val url = "https://areaserver.herokuapp.com/area/" + id.text
                    url.httpDelete().responseString { request, response, result ->
                        result.fold({ d ->
                            println("RECEIVED SUCCES:" + d)
                        }, { err ->
                            println("receiveed ERRRROOOR: " + err);
                        })
                }}
            })
            return item

            //val textView = TextView(mContext)
            //textView.text = this.mAreas?.get(position)?.name
            //return textView;
        }
    }

    class actionModel {
        var name: String? = null
        var _id: String? = null

        constructor(name: String, _id: String) {
            this.name = name
            this._id = _id
        }
    }

    class reactionModel {
        var name: String? = null
        var _id: String? = null
        constructor(name: String, _id: String) {
            this.name = name
            this._id = _id
        }
    }

    class areaModel {
        var name: String? = null
        var _id: String? = null
        var action: actionModel? = null
        var reaction: reactionModel? = null

        constructor(name: String, _id: String, action: actionModel, reaction: reactionModel) {
            this.name = name
            this._id = _id
            this.action = action
            this.reaction = reaction
        }
    }
}
