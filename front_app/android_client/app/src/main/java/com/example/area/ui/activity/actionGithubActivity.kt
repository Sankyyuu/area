package com.example.area.ui.activity

import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import android.widget.EditText
import android.widget.TextView
import android.widget.Toast
import com.example.area.R
import com.example.area.reactionsActivity
import org.json.JSONObject

class actionGithubActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_action_github)
        var actionName: String = intent.getStringExtra("actionName")
        var actName = this.findViewById<TextView>(R.id.actName)
        actName.setText(actionName)
    }

    fun nextStep (view: View)
    {
        val owner = this.findViewById<EditText>(R.id.owner)
        val repository = this.findViewById<EditText>(R.id.repository)
        val actName = this.findViewById<TextView>(R.id.actName)
        if (owner.text.toString() == "" || repository.text.toString() == "")
        {
            Toast.makeText(this, "Please fill the data", Toast.LENGTH_SHORT).show()
            return;
        }
        val intent = Intent(this, reactionsActivity::class.java);

        val rootObject = JSONObject()
        rootObject.put("name", actName.text.toString())
        rootObject.put("owner", owner.text.toString())
        rootObject.put("repo", repository.text.toString())

        intent.putExtra("actionName", actName.text.toString())
        intent.putExtra("actionObj", rootObject.toString())
        startActivity(intent);
    }
}
