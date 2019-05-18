package com.example.area

import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import com.example.area.ui.activity.ReactionLinkedinPostActivity
import com.example.area.ui.activity.ReactionYoutubeCommentActivity
import com.example.area.ui.activity.ReactionYoutubeLikeActivity
import com.example.area.ui.activity.reactionTwitterUnfollowActivity
import com.example.area.ui.reactionTwitterPostActivity
import com.github.kittinunf.fuel.httpGet
import com.google.gson.Gson
import com.google.gson.GsonBuilder

class reactionsActivity : AppCompatActivity() {

    class reactionModel {
        var name: String? = null
        constructor(name: String, _id: String) {
            this.name = name
        }
    }

    var user: String = ""
    var _gson: Gson? = null
    lateinit var reactions: Array<reactionModel>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_reactions)
        var actionName: String = intent.getStringExtra("actionName")

        var title = this.findViewById<TextView>(R.id.title)
        title.text = "Cook " + actionName + " with"

        println("actionName:" + actionName)

        val prefs = this.getSharedPreferences("area_user", Context.MODE_PRIVATE)
        this.user = prefs!!.getString("uid", "uid")
        println("user= " + this.user);
        this._gson = GsonBuilder().create()
        this.getRections{
            val listReactions = this.findViewById<ListView>(R.id.reactionsList)
            listReactions?.setBackgroundColor(Color.parseColor("#efeff5"))
            println("this.actions=" + this.reactions)
            listReactions?.adapter = MyCustomAdapter(this, this.reactions, this.findViewById<TextView>(R.id.choosenIngredient))
        }
    }

    fun getRections(callback: () -> Unit) {
        val userid = this.user.replace("\"", "")
        val url ="https://areaserver.herokuapp.com/area/reactions/available/mobile?userId=${userid}"
        url.httpGet().responseString { request, response, result -> result.fold({ d ->
            println("data = "+d)
            this.reactions = this._gson!!.fromJson(d, Array<reactionModel>::class.java)
            //println(this.actions.get(0).name)
            callback()
        }, { err ->
            println("receiveed ERRRROOOR: " + err);
            callback()
        })
        }
    }

    fun fillReaction(view: View) {

        val choosen = this.findViewById<TextView>(R.id.choosenIngredient)
        val actionName: String = intent.getStringExtra("actionName")
        val actionObj: String? = intent.getStringExtra("actionObj")

        println("GOIN TO TWITER")

        //foret de if
        if (choosen.text.toString() == "") {
            Toast.makeText(this, "Please select a reaction", Toast.LENGTH_SHORT).show()
            return
        }
        if (choosen.text == "post_tweet") {
            val intent = Intent(this, reactionTwitterPostActivity::class.java);
            intent.putExtra("actionName", actionName)
            intent.putExtra("actionObj", actionObj)
            startActivity(intent);
        }
        if (choosen.text == "unfollow") {
            val intent = Intent(this, reactionTwitterUnfollowActivity::class.java)
            intent.putExtra("actionName", actionName)
            intent.putExtra("actionObj", actionObj)
            startActivity(intent)
        }
        if (choosen.text == "linkedin_post") {
            val intent = Intent(this, ReactionLinkedinPostActivity::class.java)
            intent.putExtra("actionName", actionName)
            intent.putExtra("actionObj", actionObj)
            startActivity(intent)
        }
        if (choosen.text == "youtube_comment") {
            val intent = Intent(this, ReactionYoutubeCommentActivity::class.java)
            intent.putExtra("actionName", actionName)
            intent.putExtra("actionObj", actionObj)
            startActivity(intent)
        }
        if (choosen.text == "youtube_like") {
            val intent = Intent(this, ReactionYoutubeLikeActivity::class.java)
            intent.putExtra("actionName", actionName)
            intent.putExtra("actionObj", actionObj)
            startActivity(intent)
        }
        //startActivity(Intent(this, githubActionActivity::class.java))
    }

    private class MyCustomAdapter(context: Context, reaction: Array<reactionModel>, ingredientChoosen: TextView): BaseAdapter() {

        private val mContext: Context
        private val mReactions: Array<reactionModel> = reaction
        private val choosen: TextView = ingredientChoosen


        init {
            mContext = context
        }

        override fun getCount(): Int {
            return mReactions.size
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

            actionName.text = this.mReactions?.get(position)?.name

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
