package com.example.area.ui.activity

import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import com.example.area.R
import com.github.kittinunf.fuel.httpGet
import com.google.gson.Gson
import com.google.gson.GsonBuilder

class actionActivity : AppCompatActivity() {

    class actionModel {
        var name: String? = null
        constructor(name: String, _id: String) {
            this.name = name
        }
    }

    var user: String = ""
    var _gson: Gson? = null
    lateinit var actions: Array<actionModel>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_action)
        val prefs = this.getSharedPreferences("area_user", Context.MODE_PRIVATE)
        this.user = prefs!!.getString("uid", "uid")
        println("user= " + this.user);
        this._gson = GsonBuilder().create()
        this.getActions{
            val listActions = this.findViewById<ListView>(R.id.actionsList)
            listActions?.setBackgroundColor(Color.parseColor("#efeff5"))
            println("this.actions=" + this.actions)
            listActions?.adapter = actionActivity.MyCustomAdapter(this, this.actions, this.findViewById<TextView>(R.id.choosenIngredient))
        }
    }

    fun getActions(callback: () -> Unit) {
        val userid = this.user.replace("\"", "")
        val url ="https://areaserver.herokuapp.com/area/actions/available/mobile?userId=${userid}"
        url.httpGet().responseString { request, response, result -> result.fold({ d ->
            println("data = "+d)
            this.actions = this._gson!!.fromJson(d, Array<actionModel>::class.java)
            //println(this.actions.get(0).name)
            callback()
        }, { err ->
            println("receiveed ERRRROOOR: " + err);
            callback()
        })
        }
    }

    fun fillAction(view: View) {

        val choosen = this.findViewById<TextView>(R.id.choosenIngredient)

        //foret de if
        if (choosen.text == "" || choosen.text == null) {
            Toast.makeText(this, "Please select an action", Toast.LENGTH_SHORT).show()
            return
        }
        if (choosen.text == "github_star" || choosen.text == "github_pull_request"
                || choosen.text == "github_issue" || choosen.text == "github_push") {
            val intent = Intent(this,actionGithubActivity::class.java)
            val actionName = choosen.text.toString()
            intent.putExtra("actionName", actionName)
            startActivity(intent);
        }
        else if (choosen.text == "weather_temp") {
            val intent = Intent(this, ActionMeteoActivity::class.java)
            val actionName = choosen.text.toString()
            intent.putExtra("actionName", actionName)
            startActivity(intent)
        }
        else if (choosen.text == "weather_rain" || choosen.text == "weather_wind") {
            val intent = Intent(this, ActionMeteo2Activity::class.java)
            val actionName = choosen.text.toString()
            intent.putExtra("actionName", actionName)
            startActivity(intent)
        }
        //startActivity(Intent(this, githubActionActivity::class.java))
    }

    private class MyCustomAdapter(context: Context, areas: Array<actionModel>, ingredientChoosen: TextView): BaseAdapter() {

        private val mContext: Context
        private val mActions: Array<actionModel> = areas
        private val choosen: TextView = ingredientChoosen


        init {
            mContext = context
        }

        override fun getCount(): Int {
            return mActions.size
        }

        override fun getItemId(position: Int): Long {
            return position.toLong()
        }

        override fun getItem(position: Int): Any {
            println("lololol")
            return "test"
        }

        override fun getView(position: Int, convertView: View?, parent: ViewGroup?): View {
            val layoutInflater = LayoutInflater.from(this.mContext)

            val item = layoutInflater.inflate(R.layout.action_item, parent, false)
            var actionName = item.findViewById<TextView>(R.id.actionName);
            var buttonSelect = item.findViewById<Button>(R.id.buttonSelect);

            println("this.aACTION NZAME =" +this.mActions?.get(position)?.name)
            actionName.text = this.mActions?.get(position)?.name

            buttonSelect.setOnClickListener( object : View.OnClickListener {
                override fun onClick(v: View) {
                    choosen.text = actionName.text
                }
            })
            return item

            //val textView = TextView(mContext)
            //textView.text = this.mAreas?.get(position)?.name
            //return textView;
        }
    }

}
