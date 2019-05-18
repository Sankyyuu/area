package com.example.area.login

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.view.View
import android.widget.Toast
import com.beust.klaxon.JsonObject
import com.beust.klaxon.Parser
import com.example.area.R
import com.example.area.ui.activity.HomeActivity
import com.github.kittinunf.fuel.httpPost
import kotlinx.android.synthetic.main.activity_sign_up.*
import org.json.JSONObject

class SignUpActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_sign_up)
//        val toolBar = findViewById<Toolbar>(R.id.app_bar)
//        setSupportActionBar(toolBar)
//        getSupportActionBar()?.setTitle("Sign Up")
    }

    fun setUid(data: String) {
//        val klaxon = Klaxon()
//        val parsed = klaxon.parseJsonObject(StringReader(data))
//        val uid = parsed["_id"].toString()
        val prefs = this.getSharedPreferences("area_user", Context.MODE_PRIVATE)
        prefs.edit().putString("uid", data).apply()
    }

    fun SignUp(view: View) {
        val username = registerUsername.text.toString();
        val email = registerEmail.text.toString();
        val password = registerPassword.text.toString();

        val parser: Parser = Parser()
        val stringBuilder: StringBuilder = StringBuilder("{\"username\":\"$username\", \"email\":\"\$email\", \"password\":\"$password\"}")
        val data: JsonObject = parser.parse(stringBuilder) as JsonObject

        val rootObject = JSONObject()

        rootObject.put("email", email)
        rootObject.put("username", username)
        rootObject.put("password", password)




        val bodyJson = """{"username:"$username",email:"$email",password:"$password}"""
        "https://areaserver.herokuapp.com/user/create".httpPost().header("Content-Type" to "application/json").body(rootObject.toString()).responseString { request, response, result ->
            //do something with response
            print("SENDED");
            result.fold({ d ->
                //do something with data
                println("RECEIVED SUCCES:$d")
                setUid(d)
                Toast.makeText(this, "Account successfuly created", Toast.LENGTH_SHORT).show()
                startActivity(Intent(this, HomeActivity::class.java))
            }, { err ->
                //do something with error
                println("receiveed ERRRROOOR: $err")
                Toast.makeText(this, "Sign up Failed ", Toast.LENGTH_SHORT).show()
            })
        }
    }

    fun alreadyAccount(view: View) {
        val loginActivity = Intent(this, LoginActivity::class.java)
        startActivity(loginActivity)
    }
}
