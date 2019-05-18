package com.example.area.ui

import android.content.Context
import android.content.Intent
import android.graphics.Point
import android.os.Bundle
import android.support.v4.app.Fragment
import android.view.*
import android.widget.PopupMenu
import android.widget.Toast
import com.beust.klaxon.Klaxon
import com.example.area.R
import com.example.area.login.MainActivity
import com.github.kittinunf.fuel.httpDelete
import com.github.kittinunf.fuel.httpGet
import kotlinx.android.synthetic.main.fragment_profile.*
import java.io.StringReader

class ProfileFragment : Fragment() {

    companion object {
        fun newInstance(): ProfileFragment {
            return ProfileFragment()
        }
    }

    lateinit var username: String
    lateinit var email: String

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_profile, container, false)
    }

    override fun onStart() {
        super.onStart()

        val wm = context?.getSystemService(Context.WINDOW_SERVICE) as WindowManager
        val display = wm.defaultDisplay

        val size = Point()
        display.getSize(size)
        val width = size.x

        /////
        getUserCredentials()

        profileAvatar?.layoutParams?.height = width / 3

        modifyButton?.setOnClickListener {
            val fragment = ModifyProfileFragment()
            fragment.username = username
            fragment.email = email
            fragmentManager?.beginTransaction()
                    ?.replace(R.id.rootLayout, fragment)
                    ?.commit()
        }

        deleteButton?.setOnClickListener {
            val popup = PopupMenu(activity, deleteButton)
            popup.menuInflater.inflate(R.menu.delete_account, popup.menu)

            popup.setOnMenuItemClickListener {
                if (it.title == "YES") {
                    val prefs = activity?.getSharedPreferences("area_user", Context.MODE_PRIVATE)
                    val uid = prefs?.getString("uid", "")?.replace("\"", "")

                    "https://areaserver.herokuapp.com/user/$uid".httpDelete()
                            .header("Content-Type" to "application/json")
                            .responseString { _, _, result ->
                                result.fold({
                                    Toast.makeText(activity, "Account is deleted", Toast.LENGTH_SHORT).show()
                                    prefs?.edit()?.remove("uid")?.apply()
                                    startActivity(Intent(activity, MainActivity::class.java))
                                }, { err ->
                                    println("RECEIVED ERROR: $err")
                                    Toast.makeText(activity, "Error while deleting", Toast.LENGTH_SHORT).show()
                                })
                            }
                } else {
                    Toast.makeText(activity, "Canceled", Toast.LENGTH_SHORT).show()
                }
                true
            }

            popup.show()
        }
    }

    private fun getUserCredentials() {
        val prefs = activity?.getSharedPreferences("area_user", Context.MODE_PRIVATE)
        val uid = prefs?.getString("uid", "")?.replace("\"", "")

        "https://areaserver.herokuapp.com/user/$uid".httpGet()
                .header("Content-Type" to "application/json")
                .responseString { _, _, result ->
                    result.fold({
                        val klaxon = Klaxon()
                        val parsed = klaxon.parseJsonObject(StringReader(it))
                        username = parsed["username"].toString()
                        email = parsed["email"].toString()
                        usernameField.text = username
                        emailField.text = email
                    }, { err ->
                        println("RECEIVED ERROR: $err")
                    })
                }
    }
}
